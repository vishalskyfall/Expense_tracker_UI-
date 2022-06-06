import { useContext } from "react";
import { ExpenseTrackerContext } from './context/context';
import { incomeCategories, expenseCategories, resetCategories } from './constants/categories';

const useTransactions = (title) => {

    resetCategories();
    const { trans } = useContext(ExpenseTrackerContext);
    const transactionPerType = trans.filter((t) => t.type === title);
    const total = transactionPerType.reduce((acc, currVal) => acc += currVal.amount, 0);
    // for sum and + it's better to use reduce
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    transactionPerType.forEach((t) => {
        const category = categories.find(c => c.type === t.category)
        if (category) category.amount += t.amount;
    })

    const filteredCategories = categories.filter(c =>c.amount>0)
    const chartData = {
        datasets: [{
             data: filteredCategories.map((c)=>c.amount),
             backgroundColor: filteredCategories.map((c)=>c.color)
        }],
        labels: filteredCategories.map((c)=>c.type)
    }

    return {filteredCategories, total, chartData}
} 

export default useTransactions