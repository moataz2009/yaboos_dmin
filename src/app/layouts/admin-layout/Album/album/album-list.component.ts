import { Component, OnInit } from '@angular/core';
import { Album , Language , Categories  , Artist ,Songs } from 'app/shared/models';
import { AlbumService, ArtistService , LanguagesService , CategoriesCategoriesService , SongsService } from 'app/shared/services/api';
import { SwalService } from 'app/shared/services';
import { Router } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EventEmitter} from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})

export class AlbumListComponent implements OnInit {


AlbumObject:Album;
albumList: Album[]=[];

langList:Language[]=[];
AlbumCatList:Categories[]=[];
ArtistList : Artist[]=[];
SongsList :Songs[] =[];
Songlength:number;

Obj = new Album();

data=[];
pagenumber=0;
pageTitle=1;
// ****
baseUrl:string= "http://188.225.184.108:9091/";
// ****
LangId:number=0;
artistId:number=0;
AlbumCatId:number=0;

Lang:Language =new Language();
artist:Artist;
AlbumCat:Categories;
// ****
imageSrc: string = '';
private Extension :string = '';
private base64 :string[] = [];
ExtensionType:string='';
base64_header = "data:image/"+this.Extension+";base64,";

// ****
term: string;
i:number;
test:any;
selectedArtisitId :number;
imageError : string;
pageStart :number = 1;
pageLast:number = 3;
pagesnumber:number;
  base64textString: string;
// ****
  constructor( private AlbumServices: AlbumService ,
    private LanguagesServices: LanguagesService, 
    private AlbumCategories :CategoriesCategoriesService ,
    private ArtistServices : ArtistService,
    private swalService: SwalService,
    private route: Router,
    private songsService :SongsService
    ) { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('.pagination li').click(function(){
       $('.myactive').removeClass('myactive');
       $(this).addClass("myactive");
     });

   });
    this.getAllData();
    this.LoadLists();
    // this.getLang();

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
//   getAllData(){
// this.AlbumServices.Search('1000' , '1000' , '').subscribe(res =>{
  
//     this.data = [];
//     let a  = (res.result.length /100)+1;
//     for (let index = 1; index <= a; index++) {
//         this.data.push(index) 
//         }
//     this.albumList = res.result;

// })
//   }
  
getAllData(){
  debugger;
  this.AlbumServices.Search(String(this.pagenumber),'12' ,'').subscribe(res =>{
      this.data = [];
      this.pagesnumber =Math.round((res.length /12)) +1;
      for (let index = this.pageStart; index <= this.pageLast; index++) {
         this.data.push(index) 
      }
      this.albumList = res.result;
    });

    
  

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













// ******* save ***********************
onClickSubmit (data ,addOrEdit:number,formName){
this.AlbumObject=data;
this.AlbumObject.artistId=this.Obj.artistId;
this.AlbumObject.image=this.Obj.image;
this.AlbumObject.extension = this.Obj.extension;
this.AlbumObject.isFeatured=false;
this.AlbumObject.realeaseDate = this.Obj.realeaseDate;
if (addOrEdit ==0 ) // add
{
this.AlbumServices.create(this.AlbumObject).subscribe(res =>{
  this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
  this.reset();
  this.getAllData();
}, err => {
  let errorMessage =  err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
  this.swalService.NotifierError(errorMessage)
 })
 
}
else if ( addOrEdit ==1 ){
  this.AlbumServices.update( this.Obj.id, this.AlbumObject).subscribe(res =>{
    this.swalService.Notifier(' تم التعديل بنجاح .. شكرا لك ');
    this.reset();
    this.getAllData();
  }, err => {
    let errorMessage =  err.data || ' حدث خطأ اثناء التعديل  .. من فضلك حاول مرة آخري    ';
    this.swalService.NotifierError(errorMessage)
   })
}

formName.resetForm();
this.imageSrc="";

}

reset(){
  // clear
  // this.AlbumObject.id = 0;
  // this.AlbumObject.title = '';
  // this.AlbumObject.titleAr = '';
  
}
// *******************Get Lists********
getLang(){
  this.LanguagesServices.getAll("0","100").subscribe(
    res=>{this.langList=res.result;  } 
  );
}
getAlbumCategory(){
  this.AlbumCategories.getAll("0","100").subscribe(
    res=>{this.AlbumCatList=res.result; } 
  );
}
getArtists (){
  this.ArtistServices.getAll("0","1000000").subscribe(
    res=>{this.ArtistList=res.result;} 
  );
}
// **************delete***************

delete(id:number ){
  this.i = this.albumList.findIndex(x => x.id === id);

  this.Obj = {...this.albumList[this.i]}

  this.songsService.GetSongsOfAlbum('0','100',this.Obj.id).subscribe(res => {
    this.Songlength = res.length;
    if (this.Songlength >0)
  {
    this.swalService.Notifier("من فضلك يوجد اغانى مرتبطه بهذ الالبوم.. قم بحذفها اولا ");
  }
  else {
    this.swalService.showRemoveConfirmation(this.Obj.title).then(
      result => {
        if (result.value) {
          this. AlbumServices.delete(this.Obj.id).subscribe(
            res => {
              this.swalService.Notifier('تم مسح البيانات بنجاح ');
              this.reset();
              this.getAllData();
            },
            err => {
              let errorMessage = err.message || ' خطآ في مسح البيانات  ';
              this.swalService.NotifierError(errorMessage)
            }
          )
        }
      }
    );
}
  })
}
// **************edit******************
fill(prop: Album) {
  this.getArtists();
  this.Obj=prop;
  this.imageSrc = this.baseUrl+prop.image;
  if( prop.realeaseDate != null){
    let current_realeaseDate = new Date(prop.realeaseDate);
    var day = ("0" + current_realeaseDate.getDate()).slice(-2);
    var month = ("0" + (current_realeaseDate.getMonth() + 1)).slice(-2);
    var today = current_realeaseDate.getFullYear()+"/"+(month)+"/"+(day) ;
  $('#current_realeaseDate').val(today);


    }
}
// **************** load lists *******
LoadLists(){
  this.getLang();
  this.getAlbumCategory();
  this.getArtists();
}
// ***********************************
handleInputChange(e) {
  var files = e.target.files;
  var file = files[0];

if (files && file) {
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    this.Obj.extension ="."+ e.target.files[0].name.split('.')[1];
}

}
_handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64textString= btoa(binaryString);
         this.Obj.image =  this.base64textString ;
}
        

// **************search *******
Search_Term (data){
    this.AlbumServices.Search('0','12' , data.search).subscribe(res =>{
    this.albumList = res.result;
    })

}
filterDate(releaseDate)
{

}



// *************  artist autocomplete ***********

myControl = new FormControl();
filteredOptions: Observable<Artist[]>;

// options: string[] = ['Cash', 'Credit Card', 'Paypal'];
objectOptions=[
  {name:"angular0"},
  {name:"angular1"},
  {name:"angular2"},
  {name:"angular3"},
];

// displayFn(subject){
//   return subject?subject.name :undefined;
// }

displayFn( user : Artist): string {
  return user && user.name ? user.name : '';
}

newOb :NewArtist[];

private _filter(value: string): Artist[] {
  const filterValue = value.toLowerCase();
  // return this.options.filter(option => option.toLowerCase().includes(filterValue));
  this.ArtistServices.SearchArtist(filterValue).subscribe(
    res=> {
      this.ArtistList=res.result;
      // console.log(this.ArtistList );
    },
    error => {
      return  this.ArtistList =[];
    }
  )
return  this.ArtistList;
  // return this.ArtistList.map(x=>x.name  );
}



onShopSelectionChanged(event) {
  this.Obj.artistId = event.option.id;

}

}

 class NewArtist {
  id:number;
  name:string;
}