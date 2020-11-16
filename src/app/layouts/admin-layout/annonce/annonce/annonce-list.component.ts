import { Component, OnInit } from '@angular/core';
import { Annonce } from 'app/shared/models';
import { AnnonceService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.scss']
})
export class AnnonceListComponent implements OnInit {

// main object
  annonce:Annonce;

  //array list 
  annonceList: Annonce[]=[];


  isEdit : boolean = false;
  index : number
  editObj :Annonce = new Annonce();
  formSubmitted: boolean= false;
  data=[];
  pagenumber=0;
  pageTitle=1;
pageStart :number = 1;
pageLast:number = 3;
pagesnumber:number;
  constructor( private annonceServices: AnnonceService ,
    private swalService: SwalService,
    private route: Router,

    ) { }

  ngOnInit(): void {
    this.getAllData();
  }



// get all data of annonce
  // getAllData(){
  //   this.annonceServices.getAll(String(this.pagenumber),'100').subscribe(res =>{
  //       this.data = []
  //       let a  = (res.result.length /100)+1;
        
  //       for (let index = 1; index <= a; index++) {
  //          this.data.push(index) 
        
          
  //       }
  //       this.annonceList = res.result.map(item =>{
  //       item.image = 'http://188.225.184.108:9091/'+item.image
  //       return item
  //     })
      
  //   })

  // }
  getAllData(){
    this.annonceServices.getAll(String(this.pagenumber),'12').subscribe(res =>{
        this.data = [];
        this.pagesnumber =Math.round((res.length /12)+1);
        for (let index = this.pageStart; index <= this.pageLast; index++) {
           this.data.push(index) 
        }
        this.annonceList = res.result.map(item =>{
        item.image = 'http://188.225.184.108:9091/'+item.image
        return item;
      });
   this.annonceList = res.result;
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







  delete(  index: number ) {
    this.editObj = {...this.annonceList[index]}
    this.index = index;
    this.swalService.showRemoveConfirmation(index).then(
      result => {
        if (result.value) {
          this.annonceServices.delete(this.editObj.id).subscribe(
            res => {
              this.swalService.Notifier('Done ');
              this.getAllData();

            },
            err => {
              let errorMessage = err.message || ' Error  ';
              this.swalService.NotifierError(errorMessage)
            }
          )
        }
      }
    );
  }
  


  navigateToEdit(id: number) {
    this.route.navigate([`./pages/annonce/edit/${id}`], { queryParams: { isAdd: false } })
  }
  navigateToAdd() {
    this.route.navigate([`./pages/annonce/edit/false`], { queryParams: { isAdd: true } })
  }
  cancel(){
    this.annonce.id =  0  ;
    this.annonce.title =  ''  ;
    this.annonce.titleAr =  ''  ;
    this.annonce.image =  '' ;
    this.annonce.extension =  ''  ;
    this.annonce.url =  ''  ;
    this.annonce.position =  ''  ;
    this.annonce.order =  0  ;
  }
}
