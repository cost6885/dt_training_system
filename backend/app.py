from flask import Flask, request, jsonify
from flask_cors import CORS  # CORS 추가
import json
import os

app = Flask(__name__)
CORS(app)  # 모든 도메인에서의 접근을 허용

# 데이터 파일 경로
DATA_FILE = 'employees.json'


# 직원 데이터 저장 및 불러오기 함수
def load_employees():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r', encoding='utf-8') as file:
            return json.load(file)
    return []  # 데이터가 없으면 빈 리스트 반환


def save_employees(employees):
    with open(DATA_FILE, 'w', encoding='utf-8') as file:
        json.dump(employees, file, ensure_ascii=False, indent=4)


# 직원 모델
class Employee:
    def __init__(self, name, position, salary=None):
        self.name = name
        self.position = position
        self.salary = salary if salary else 0  # 기본 salary를 0으로 설정 (옵션)

    def to_dict(self):
        return {
            'name': self.name,
            'position': self.position,
            'salary': self.salary
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            name=data['name'],
            position=data['position'],
            salary=data.get('salary', 0)  # 기본값 0 처리
        )


# 초기 데이터 삽입
def insert_initial_data():
    employees = load_employees()
    if len(employees) == 0:  # 데이터가 없을 때만 삽입
        new_employees = [
            Employee(name="김상우", position="영업기획팀").to_dict(),
            Employee(name="서민표", position="안양지점").to_dict(),
            Employee(name="오민석", position="영업기획팀").to_dict(),
            Employee(name="이병찬", position="자사몰사업팀").to_dict(),
            Employee(name="전진", position="이커머스기획팀").to_dict(),
            Employee(name="정태양", position="상품유통기획팀").to_dict(),
            Employee(name="조시묵", position="강서지점").to_dict(),
            Employee(name="조정찬", position="영업지원팀").to_dict(),
            Employee(name="김관수", position="포장개발팀").to_dict(),
            Employee(name="박재한", position="식품안전연구팀").to_dict(),
            # 추가 데이터...
        ]
        employees.extend(new_employees)
        save_employees(employees)


@app.before_request
def initialize_data():
    insert_initial_data()  # 앱 시작 시 초기 데이터 삽입


# 직원 추가 API 엔드포인트
@app.route('/add_employee', methods=['POST'])
def add_employee():
    data = request.get_json()  # JSON 형태로 데이터 받기
    try:
        new_employee = Employee(name=data['name'], position=data['position'], salary=data.get('salary'))
        employees = load_employees()
        employees.append(new_employee.to_dict())  # 새로운 직원 데이터 추가
        save_employees(employees)  # 변경된 데이터 저장
        return jsonify({'message': 'Employee added successfully!'}), 201
    except KeyError:
        return jsonify({'error': 'Invalid data. "name" and "position" are required.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# API 엔드포인트: /api/trainings (예시)
@app.route('/api/trainings')
def get_trainings():
    # 예시 데이터, 실제로는 JSON에서 가져올 수 있음
    return jsonify([
        {'name': 'Training 1', 'status': '완료'},
        {'name': 'Training 2', 'status': '진행 중'}
    ])


# API 엔드포인트: /api/tasks (예시)
@app.route('/api/tasks')
def get_tasks():
    # 예시 데이터, 실제로는 JSON에서 가져올 수 있음
    return jsonify([
        {'task_name': 'Task 1', 'priority': 'High'},
        {'task_name': 'Task 2', 'priority': 'Low'}
    ])


# 기본 라우트
@app.route('/')
def index():
    return "Connected to the local file storage!"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
