import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cursar',
  templateUrl: './cursar.component.html',
  styleUrls: ['./cursar.component.scss']
})
export class CursarComponent implements OnInit {

  item: any;

  constructor(
    private route: ActivatedRoute,
   ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
      }
    });
  }

}
