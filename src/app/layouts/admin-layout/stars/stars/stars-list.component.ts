import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'app/shared/models';
import { ArtistService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
declare var $: any;

@Component({
  selector: 'app-stars-list',
  templateUrl: './stars-list.component.html',
  styleUrls: ['./stars-list.component.scss']
})
export class StarsListComponent implements OnInit {

term = '';
datatable: string;
artistList: Artist[]=[];
isEdit : boolean = false;
index : number
artistObj :Artist = new Artist();
formSubmitted: boolean= false;
data=[];
pagenumber=0;
pageTitle=1;
pageStart :number = 1;
pageLast:number = 3;
pagesnumber:number;
  constructor(private artistServoces: ArtistService ,
    private swalService: SwalService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.pagination li').click(function(){
        $('.myactive').removeClass('myactive');
        $(this).addClass("myactive");
      });

    });

    this.getAllData();
    

  }

  // strart search
  MainSearch(artistName){
  
    if (artistName.length > 0) {
      this.artistObj.name = artistName;
     this.filterByParams();
    } else {
    }
  }
  filterByParams() {
    this.artistServoces.SearchArtist(this.artistObj.name).subscribe(res => {
      this.artistList = res.result;
      return this.artistList;
    })
  }
// end search 


  // get all data of annonce
  getAllData(){
    this.artistServoces.getAll(String(this.pagenumber),'10').subscribe(res =>{
        this.data = [];
        this.pagesnumber =Math.round((res.length /10)+1);
        console.log(this.pagesnumber);
        for (let index = this.pageStart; index <= this.pageLast; index++) {
           this.data.push(index) 
        }
   this.artistList = res.result;
      
    })

  }
  prevPages()
  {
    if(this.pageStart == 1)
    {

    }
    else{

      if(this.pagesnumber == this.pageLast)
      {
        this.pageStart = this.pageStart -3;
         this.pageLast = this.pageStart +2;
      }
      else{
        this.pageStart = this.pageStart -3;
        this.pageLast = this.pageLast -3;
      }
      this.pagenumber = this.pageStart;
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
      if(this.pagesnumber < this.pageLast)
      {
       this.pageLast = this.pageLast - this.pagesnumber +  this.pageStart;
      }
      this.pagenumber = this.pageStart;
      this.getAllData();
    }

  }
  navigate(item){
    this.pagenumber= item -1
    this.getAllData();
  }

  // navigate(dir){
  //   if(dir==1) {
  //     this.pagenumber= this.pagenumber+100;
  //     alert(this.pagenumber);
  //   }
  //   else if(dir==2) {
  //     this.pagenumber= this.pagenumber-100;
  //   }
  //   this.pageTitle = item;
  //   this.getAllData();
  //   }

  delete(  index: number ) {
    this.swalService.showRemoveConfirmation(index).then(
      result => {
        if (result.value) {
          this.artistServoces.delete(index).subscribe(
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
    this.route.navigate([`./pages/stars/edit/${id}`], { queryParams: { isAdd: false } })
  }
  navigateToAdd() {
    this.route.navigate([`./pages/stars/edit/false`], { queryParams: { isAdd: true } })
  }

}
