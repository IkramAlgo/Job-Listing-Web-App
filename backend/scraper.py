from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from app import app, db, Job
from datetime import datetime
import time

CHROMEDRIVER_PATH = './chromedriver.exe'  # Adjust path as needed

def parse_posting_date(date_str):
    # Example: parse "Posted 3 days ago" or "Posted on Jun 1, 2025"
    # Adjust this function based on actual date format on actuarylist.com
    try:
        # If exact date string, parse it
        return datetime.strptime(date_str, "%b %d, %Y")
    except Exception:
        # Fallback: return current date
        return datetime.utcnow()

def scrape_jobs():
    service = Service(CHROMEDRIVER_PATH)
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument("--window-size=1920,1080")
    driver = webdriver.Chrome(service=service, options=options)
    wait = WebDriverWait(driver, 20)

    driver.get('https://www.actuarylist.com')

    with app.app_context():
        while True:
            try:
                # Wait for job cards to load
                job_cards = wait.until(
                    EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div.Job_job-card__YgDAV'))
                )
                print(f"Found {len(job_cards)} job cards on current page.")

                for card in job_cards:
                    try:
                        # Extract fields with safe fallbacks
                        company = card.find_element(By.CSS_SELECTOR, 'p.Job_job-card__company__7T9qY').text.strip()
                        title = card.find_element(By.CSS_SELECTOR, 'p.Job_job-card__position__ic1rc').text.strip()

                        location_elements = card.find_elements(By.CSS_SELECTOR, 'div.Job_job-card__locations__x1exr a')
                        locations = ', '.join([loc.text.strip() for loc in location_elements]) if location_elements else None

                        tag_elements = card.find_elements(By.CSS_SELECTOR, 'div.Job_job-card__tags__zfriA a')
                        tags = [tag.text.strip() for tag in tag_elements] if tag_elements else []

                        # Posting date and job type extraction - adjust selectors based on site
                        try:
                            posting_date_text = card.find_element(By.CSS_SELECTOR, 'span.Job_job-card__posting-date__xyz').text.strip()
                            posting_date = parse_posting_date(posting_date_text)
                        except NoSuchElementException:
                            posting_date = datetime.utcnow()  # fallback to now

                        try:
                            job_type = card.find_element(By.CSS_SELECTOR, 'span.Job_job-card__job-type__abc').text.strip()
                        except NoSuchElementException:
                            job_type = None

                        # Check if job already exists in DB
                        existing = Job.query.filter_by(title=title, company=company).first()
                        if existing:
                            print(f"Skipping existing job: {title} at {company}")
                            continue

                        new_job = Job(
                            title=title,
                            company=company,
                            location=locations,
                            posting_date=posting_date,
                            job_type=job_type,
                            tags=tags
                        )
                        db.session.add(new_job)
                        print(f"Added job: {title} at {company}")

                    except Exception as e:
                        print(f"Error scraping job card: {e}")

                db.session.commit()
                print("Committed page jobs to database.")

                # Pagination: click Next if available and enabled
                try:
                    next_button = driver.find_element(By.LINK_TEXT, 'Next')
                    classes = next_button.get_attribute('class')
                    if 'disabled' in classes:
                        print("Next button disabled. Scraping complete.")
                        break
                    else:
                        next_button.click()
                        # Wait for old cards to disappear and new cards to load
                        wait.until(EC.staleness_of(job_cards[0]))
                        wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'div.Job_job-card__YgDAV')))
                        print("Moved to next page.")
                except NoSuchElementException:
                    print("No Next button found. Scraping complete.")
                    break

            except TimeoutException:
                print("Timeout waiting for job cards. Ending scrape.")
                break

    driver.quit()
    print("Scraping finished.")

if __name__ == '__main__':
    scrape_jobs()
