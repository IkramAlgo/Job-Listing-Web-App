from selenium import webdriver
from selenium.webdriver.chrome.service import Service

# Specify path to chromedriver.exe
service = Service("E:/job-app/backend/chromedriver.exe")

try:
    driver = webdriver.Chrome(service=service)
    driver.get("https://www.google.com")
    print("Page title is:", driver.title)
    driver.quit()
except Exception as e:
    print("Error launching ChromeDriver:", e)
