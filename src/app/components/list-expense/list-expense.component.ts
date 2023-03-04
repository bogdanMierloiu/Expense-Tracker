import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.css'],
})
export class ListExpenseComponent implements OnInit {
  expenses: Expense[] = [];

  filters = {
    keyword: '',
    sortBy: 'Name'
  };

  constructor(private _expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.listExpenses();
  }

  deleteExpense(id: number) {
    this._expenseService.deleteExpense(id).subscribe((data) => {
      console.log('deleted response', data);
      this.listExpenses();
    });
  }

  listExpenses() {
    this._expenseService
      .getExpenses()
      .subscribe((data) => (this.expenses = this.filterExpenses(data)));
  }

  filterExpenses(expenses: Expense[]) {
    return expenses.filter((e) => {
      return e.expense.toLowerCase().includes(this.filters.keyword.toLowerCase())
    })
    // .sort((a, b) => {
    //   if (this.filters.sortBy === 'Name') {
    //       return a.expense.toLowerCase() < b.expense.toLowerCase() ? expenses : expenses.reverse;
    //   }else if (this.filters.sortBy === 'Amount') {
    //       return a.amount > b.amount ? -1: 1;
    //   }
    // })
  }



}
