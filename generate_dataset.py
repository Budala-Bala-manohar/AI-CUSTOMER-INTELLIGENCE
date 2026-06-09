from faker import Faker
import random
import csv
from pathlib import Path
import argparse


def generate_customer_record(i, fake):
    genders = ['Male', 'Female', 'Other']
    occupations = [
        'Software Engineer', 'Accountant', 'Teacher', 'Doctor', 'Nurse', 'Sales Executive',
        'Business Analyst', 'Consultant', 'Marketing Manager', 'HR Manager', 'Lawyer',
        'Civil Engineer', 'Data Scientist', 'Product Manager', 'Graphic Designer', 'Manager',
        'Clerk', 'Pharmacist', 'Architect', 'Banker'
    ]
    indian_cities = [
        'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune',
        'Surat', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
        'Pimpri-Chinchwad', 'Patna', 'Vadodara'
    ]

    customer_name = fake.name()
    gender = random.choices(genders, weights=[0.48, 0.48, 0.04])[0]
    age = random.randint(18, 70)
    city = random.choice(indian_cities)
    occupation = random.choice(occupations)

    # Monthly salary (INR thousands to realistic numbers)
    if occupation in ['Software Engineer', 'Data Scientist', 'Product Manager']:
        monthly_salary = round(random.uniform(40000, 200000), 2)
    elif occupation in ['Doctor', 'Lawyer', 'Manager', 'Marketing Manager', 'Consultant']:
        monthly_salary = round(random.uniform(30000, 150000), 2)
    elif occupation in ['Teacher', 'Nurse', 'Clerk', 'Sales Executive', 'Pharmacist']:
        monthly_salary = round(random.uniform(10000, 50000), 2)
    else:
        monthly_salary = round(random.uniform(15000, 120000), 2)

    annual_income = round(monthly_salary * 12 + random.uniform(-50000, 50000), 2)

    spending_score = round(max(1, min(100, random.gauss(55, 20))), 1)

    # Monthly spend influenced by salary and spending_score
    base_spend = monthly_salary * (spending_score / 200)
    monthly_spend = round(max(100.0, base_spend + random.uniform(-0.2, 0.2) * monthly_salary), 2)

    tenure = random.randint(1, 12)

    # customer segment derived
    if annual_income > 1500000 or spending_score > 85:
        customer_segment = 'Premium Customers'
    elif annual_income > 800000 or spending_score > 65:
        customer_segment = 'High Value Customers'
    elif annual_income > 400000 or spending_score > 40:
        customer_segment = 'Regular Customers'
    else:
        customer_segment = 'Budget Customers'

    # churn probability higher for low spending_score and low tenure
    churn_prob = 0.05
    if spending_score < 30:
        churn_prob += 0.25
    if tenure <= 2:
        churn_prob += 0.15
    if customer_segment == 'Premium Customers':
        churn_prob -= 0.05

    churn = 1 if random.random() < churn_prob else 0

    return {
        'customer_id': i,
        'customer_name': customer_name,
        'gender': gender,
        'age': age,
        'city': city,
        'occupation': occupation,
        'monthly_salary': monthly_salary,
        'annual_income': annual_income,
        'spending_score': spending_score,
        'monthly_spend': monthly_spend,
        'tenure': tenure,
        'customer_segment': customer_segment,
        'churn': churn,
    }


def generate_csv(path: Path, count: int = 200, force: bool = False):
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and not force:
        # quick check for number of lines
        with open(path, 'r', encoding='utf-8') as f:
            lines = sum(1 for _ in f) - 1
        if lines == count:
            return

    fake = Faker('en_IN')
    Faker.seed(42)
    random.seed(42)

    fieldnames = [
        'customer_id', 'customer_name', 'gender', 'age', 'city', 'occupation',
        'monthly_salary', 'annual_income', 'spending_score', 'monthly_spend',
        'tenure', 'customer_segment', 'churn'
    ]

    with open(path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for i in range(1, count + 1):
            writer.writerow(generate_customer_record(i, fake))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--count', type=int, default=200)
    parser.add_argument('--force', action='store_true')
    args = parser.parse_args()
    ROOT = Path(__file__).resolve().parent
    CSV_PATH = ROOT / 'dataset' / 'customer_data.csv'
    generate_csv(CSV_PATH, count=args.count, force=args.force)
