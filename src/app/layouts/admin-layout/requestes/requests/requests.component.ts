import { Component, OnInit } from '@angular/core';
import { Requests } from 'app/shared/models/requests.model';
import { SwalService } from 'app/shared/services';
import { RequestService } from 'app/shared/services/api/requestsongs.service';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  //MAIN-OBJECT
  Requests: Requests;
  RequestsList: Requests[]=[];

  
editObj :Requests = new Requests();
index : number
data=[];
pagenumber=0;
pageTitle=1;
pageStart :number = 1;
pageLast:number = 3;
pagesnumber:number;
  constructor(private RequestService: RequestService ,private swalService: SwalService) { }

  ngOnInit(): void {
    this.getAllData();
  }
  // getAllData(){
  //   this.RequestService.getAll(String(this.pagenumber),'100').subscribe(res =>{
  //       this.data = []
  //       let a  = (res.result.length /100)+1;
  //       for (let index = 1; index <= a; index++) {
  //          this.data.push(index)     }
  //       this.RequestsList = res.result;
        
  //   })
  
  // }
  getAllData(){
    debugger;
    this.RequestService.getAll(String(this.pagenumber),'12').subscribe(res =>{
        this.data = [];
        this.pagesnumber =Math.round((res.length /12)+1);
        for (let index = this.pageStart; index <= this.pageLast; index++) {
           this.data.push(index) 
        }
        console.log(this.pagesnumber);
        this.RequestsList = res.result;
    })
  }
  prevPages()
  {
    if(this.pageStart == 1)
    {
    }
    else{
      this.pageStart = this.pageStart -3;
      this.pageLast = this.pageLast -3;
      this.getAllData();
    }
  }
  nextPages()
  {
    if(this.pagesnumber == this.pageLast)
    {
    }
    else if( this.pagesnumber < this.pageLast)
    {
    }
    else{
      this.pageStart = this.pageStart +3;
      this.pageLast = this.pageLast +3;
      this.getAllData();
    }
  }
  navigate(item){
    this.pagenumber= item -1
    this.getAllData();
  }
}
