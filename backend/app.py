from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# PostgreSQL URI 설정 (환경 변수나 직접 설정)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://dt:dt_password@localhost/mydatabase'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# SQLAlchemy 객체 생성
db = SQLAlchemy(app)

# 예시 모델 (PostgreSQL 데이터베이스에 테이블을 생성하고 사용할 수 있습니다)
class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    position = db.Column(db.String(100))
    salary = db.Column(db.Float)

@app.route('/add_employee', methods=['POST'])
def add_employee():
    data = request.get_json()  # JSON 형태로 데이터 받기
    new_employee = Employee(
        name=data['name'], 
        position=data['position'], 
        salary=data['salary']
    )
    db.session.add(new_employee)
    db.session.commit()
    return jsonify({'message': 'Employee added successfully!'}), 201

# 기본 라우트
@app.route('/')
def index():
    return "Connected to the PostgreSQL database!"

if __name__ == '__main__':

    # 데이터베이스 연결을 확인하고, 테이블을 생성할 수 있습니다.
    with app.app_context():
        db.create_all()  # 테이블 생성
    app.run(host='0.0.0.0', port=5000, debug=True)
