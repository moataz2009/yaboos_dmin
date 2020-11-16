import { Component, OnInit, ɵConsole } from '@angular/core';
import { program, programsApiData } from 'app/shared/models/program.model';
import { SwalService } from 'app/shared/services';
import { programsService } from 'app/shared/services/api/programs.service';
import { CategoriesCategoriesService } from 'app/shared/services/api/album-categories.service';
import { Album, Artist, Categories, Language, Songs } from 'app/shared/models';
import { ArtistService } from 'app/shared/services/api/artist.service';
import { SongsService } from 'app/shared/services/api/songs.service';
import { LanguagesService } from 'app/shared/services/api/languages.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'app/shared/format-datepicker';
import { AlbumService } from 'app/shared/services/api/album.service';
import { FormControl } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class ProgramsComponent implements OnInit {

  constructor(private programServices: programsService ,
  private swalService: SwalService ,
  private ArtistService : ArtistService,
  private LanguagesService : LanguagesService,
  private SongsService : SongsService,
  private AlbumService : AlbumService
  ) { }
  program: program;
  programsApiData: programsApiData[]=[];
  ProgramEposide : Songs;
  pagenumber=0;
  data=[];
  album :Album;
  programsList: program[]=[];
  ArtistList : Artist[] = [];
  SongsList : Songs[] = [];
  songObj:Songs = new Songs();
  programsAPIList: programsApiData[]=[];
  CategoriesList : Categories[] = [];
  LanguagesList : Language[] = [];
  isFeatured : boolean = false;
 CategoryId : number = 2;
 pageStart :number = 1;
pageLast:number = 3;
pagesnumber:number;
base64textString: string;
imageSrc: string = '';
myControl = new FormControl();
filteredOptions: Observable<Artist[]>;
  ngOnInit(): void {
    this.program = new program();
    this.ProgramEposide = new Songs();
     this.getAllData();
    // this.getAllCategories();
  this.getAllArtists();
  this.getAllLanguages();
  
  this.filteredOptions = this.myControl.valueChanges
  .pipe(
    startWith(''),
    map(value => this._filter(value))
  );
  }
  getAllEposides(programId){
    debugger;
    this.SongsService.GetSongsOfAlbum("0" , "10" , programId).subscribe(res => {
      this.SongsList = res.result;
      // this.SongsList.forEach(function (i , item) {
      //  i.lowQuality = `http://188.225.184.108:9091/api/songs/admin/episode/${i.id}`;
      //  i.highQuality = `http://188.225.184.108:9091/api/songs/admin/episode/${i.id}`;
      // }); 
  });
  }
  private _filter(value: string): Artist[] {
    const filterValue = value.toLowerCase();
    // return this.options.filter(option => option.toLowerCase().includes(filterValue));
    this.ArtistService.SearchArtist(filterValue).subscribe(
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


  getAllLanguages(){
    this.LanguagesService.getAll(String(this.pagenumber),'100').subscribe(res =>{
        this.data = []
        let a  = (res.result.length /100)+1;
        for (let index = 1; index <= a; index++) {
           this.data.push(index)     }
        this.LanguagesList = res.result;
    })
  
  }
  getAllArtists(){
    this.ArtistService.GetPresenter("0" , "10" , "" , "true").subscribe(res => {
      this.ArtistList = res.result;
      
  });
  }

  getAllData(){
    this.programServices.getAll(String(this.pagenumber),'12').subscribe(res =>{
        this.data = [];
        this.pagesnumber =Math.round((res.length)) +1;
        for (let index = this.pageStart; index <= this.pageLast; index++) {
           this.data.push(index) 
        }
        this.programsList = res.result;
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
  handleInputChange(e) {
    var files = e.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();
      reader.onload =this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      this.program.extension ="."+ e.target.files[0].name.split('.')[1];
  }
  
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           this.program.image =  this.base64textString ;
  }
  handleAudioChange(e) {
    var files = e.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();
      reader.onload =this._handleAudioLoaded.bind(this);
      reader.readAsBinaryString(file);
     // this.program.guid ="."+ e.target.files[0].name.split('.')[1];
  }
  
  }
  _handleAudioLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           this.program.guid =  this.base64textString ;
  }
  


//low quality 
handleAudioLowQualityChange(e) {
  var files = e.target.files;
  var file = files[0];

if (files && file) {
    var reader = new FileReader();
    reader.onload =this._handleAudioLowQualityLoaded.bind(this);
    reader.readAsBinaryString(file);
}

}
_handleAudioLowQualityLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64textString= btoa(binaryString);
        this.ProgramEposide.lowQuality =  this.base64textString ;
}


///high Quality
handleAudioHighQualityChange(e) {
  var files = e.target.files;
  var file = files[0];

if (files && file) {
    var reader = new FileReader();
    reader.onload =this._handleAudioHighQualityLoaded.bind(this);
    reader.readAsBinaryString(file);
}

}
_handleAudioHighQualityLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64textString= btoa(binaryString);
        this.ProgramEposide.highQuality =  this.base64textString ;
}










  
  fill(prop: program){
    this.program.id = prop.id;
    this.program.title = prop.title;
    this.program.titleAr = prop.titleAr;
    this.program.image = prop.image;
  }
  reset(){
    this.program.id = 0;
    this.program.title = '';
    this.program.titleAr = '';
    
    }
    saveupdate()
    {
      this.update();
    }
    update( ) {
      this.programServices.update(this.program.id,this.program).subscribe(
        res => {
          this.swalService.Notifier('تم حفظ التعديلات بنجاح ');
           this.reset();
          this.getAllData();
        },
        err => {
          let errorMessage = err.data || ' حدث خطأ اثناء التعديل .. من فضلك حاول مرة آخري    ';
          this.swalService.NotifierError(errorMessage)
      
        }
      )
      }
      onChangeEventFunc()
      {

      }
    cancel(){

    }
    chooseLang(langId)
    {
      this.program.langId = langId;
    }
    chooseArtis(artistId)
    {
      this.program.artistId = artistId;
    }
    save(){
      this.album = new Album();
      this.album.title = this.program.title;
      this.album.titleAr = this.program.titleAr;
      this.album.artistId = this.program.artistId;
      this.album.languageId = 1;
      this.album.albumCategoryId = this.CategoryId;
      this.isFeatured = false;
      this.album.image = this.program.image;
      this.album.guid = this.program.guid;
      this.album.description = this.program.description;
      this.album.descriptionAr = this.program.descriptionAr;
      this.AlbumService.create(this.album).subscribe(
        res => {
          this.swalService.Notifier('تم حفظ التعديلات بنجاح ');
           this.reset();
          this.getAllData();
        },
        err => {
          let errorMessage = err.data || ' حدث خطأ اثناء التعديل .. من فضلك حاول مرة آخري    ';
          this.swalService.NotifierError(errorMessage)
      
        }
      )
    }
    onShopSelectionChanged(event)
    {
      debugger;
      this.program.artistId = event.option.id;
    }
    filterDate()
    {

    }
    delete( index: number ) {
       this.swalService.showRemoveConfirmation(index).then(
         result => {
           if (result.value) {
             this.programServices.delete(index).subscribe(
           
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
    AddEpisodes(programId)
      {
        this.program.id = programId;
        this.getAllEposides(programId); 
      }
      deleteEposide(EposideId){
        this.swalService.showRemoveConfirmation(EposideId).then(
          result => {
            if (result.value) {
              this.SongsService.delete(EposideId).subscribe(
            
                res => {
                  this.swalService.Notifier('تم مسح البيانات بنجاح ');
                  this.reset();
                  this.getAllEposides(this.program.id);
       
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
  SaveEposide()
  {
 debugger;
 var x = this.program.id;
 this.ProgramEposide;
 this.ProgramEposide.albumId = this.program.id;
 
 this.SongsService.create(this.ProgramEposide).subscribe(res =>{
  this.swalService.Notifier(' تم الحفظ بنجاح .. شكرا لك ');
  this.reset();
  this.getAllEposides(x);
 
 }, err => {
  let errorMessage =  err.data || ' حدث خطأ اثناء الحفظ .. من فضلك حاول مرة آخري    ';
  this.swalService.NotifierError(errorMessage)
 })
      }
}
