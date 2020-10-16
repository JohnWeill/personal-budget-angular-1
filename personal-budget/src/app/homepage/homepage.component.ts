import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
        {
            data: [30, 350, 90, 50, 10, 15, 9],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ],
        }
    ],
    labels: [
      'Eat out',
      'Rent',
      'Groceries',
      'Games',
      'Gas',
      'Power',
      'Netlfix'
  ]
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:3000/budget')
    .subscribe((res: any) => {
      // tslint:disable-next-line: no-debugger
      debugger;
      console.log(res);
      for (var i = 0; i < res.data.length; i++) {
        this.dataSource.datasets[0].data[i] = res.data.myBudget[i].budget;
        this.dataSource.labels[i] = res.data.myBudget[i].title;
        this.createChart();
      }

    });
  }

  createChart() {
    // var ctx = document.getElementById('myChart').getContext('2d');
    const ctx = document.getElementById('myChart');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
}

}
