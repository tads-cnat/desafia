from typing import List
from ninja import Router
from django.shortcuts import get_object_or_404
from api.schemas import EmployeeIn, EmployeeOut
from api.models import Employee

router = Router()


@router.post("/employees", response=EmployeeOut)
def create_employee(request, payload: EmployeeIn):
    employee = Employee.objects.create(**payload.dict())
    return EmployeeOut(**employee)


@router.get("/employees/{employee_id}", response=EmployeeOut)
def get_employee(request, employee_id: int):
    employee = get_object_or_404(Employee, id=employee_id)
    return employee


@router.get("/employees", response=List[EmployeeOut])
def list_employees(request):
    qs = Employee.objects.all()
    return qs


@router.put("/employees/{employee_id}")
def update_employee(request, employee_id: int, payload: EmployeeIn):
    employee = get_object_or_404(Employee, id=employee_id)
    for attr, value in payload.dict().items():
        setattr(employee, attr, value)
    employee.save()
    return {"success": True}


@router.delete("/employees/{employee_id}")
def delete_employee(request, employee_id: int):
    employee = get_object_or_404(Employee, id=employee_id)
    employee.delete()
    return {"success": True}
