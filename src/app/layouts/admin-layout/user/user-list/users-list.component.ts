import { Component, OnInit  } from '@angular/core';
import { SwalService } from 'app/shared/services';
import { User } from 'app/shared/models';
import { UsersService } from 'app/shared/services/api';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

user: User;
userObj=new User();
UserList: User[]=[];
pagenumber:number=0;
i:number;
admin:number;
pass:string;
data=[];
pageTitle=1;
pageStart :number = 1;
pageLast:number = 3;
pagesnumber:number;
  constructor(private swalService: SwalService,
    private userServices: UsersService
  ) {
  }
  ngOnInit(): void {
    this.user = new User()
    this.GetAllUsers();
  }
  // getuser
  // GetAllUsers(){
  //   this.userServices.getAll(String(this.pagenumber) ,'20').subscribe(
  //     res=>{
  //       this.UserList = res.result;
  //       // console.log(this.UserList);
  //     }
  //   )
  // }

  GetAllUsers(){
    debugger;
    this.userServices.getAll(String(this.pagenumber),'12').subscribe(res =>{
        this.data = [];
        this.pagesnumber =Math.round((res.length /12)+1);
        
        for (let index = this.pageStart; index <= this.pageLast; index++) {
           this.data.push(index) 
        }
        console.log(res);
        this.UserList = res.result;
      
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
      this.GetAllUsers();
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
      this.GetAllUsers();
    }

  }
  navigate(item){
    this.pagenumber= item -1
    this.GetAllUsers();
  }



















  delete(id : string){
    this.i = this.UserList.findIndex(x => x.id == id);
    this.userObj = {...this.UserList[this.i]}

    this.swalService.showRemoveConfirmation(this.userObj.name).then(
      result => {
        if (result.value) {
          this. userServices.delete(id).subscribe(
            res => {
              this.swalService.Notifier('تم مسح البيانات بنجاح ');
              // this.reset();
              this.GetAllUsers();
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
  updateRole(id:string)
  {
    // debugger;
    this.fillObj(id);
    console.log(this.userObj);
    
  if(this.userObj.role.length==2)
  {
    if (this.userObj.role[0].trim() =="Admin" || this.userObj.role[1].trim() =="Admin")
    {
      this.admin=1;
    }
    else{
      this.admin=2; //client
    }
  }
  else if (this.userObj.role.length==1){
    if (this.userObj.role[0].trim() =="Admin" )
    {
      this.admin=1;
    }
    else{
      this.admin=2; //client
    }
    
  }
  }
  ChAdmin:boolean;
  onClickSubmit(data )
  {
    debugger;
    if(data.Roles ==1)
    {
      this.ChAdmin=true;
    }
    else if (data.Roles==2 ){
      this.ChAdmin=false;
    }

    this.userServices.updateUserRole(this.userObj.id ,   this.ChAdmin ) .subscribe (
      res => {
          this.swalService.Notifier('تم التعديل بنجاح ');
          this.GetAllUsers();
        },
        err => {
          let errorMessage = err.message || ' خطآ ';
          this.swalService.NotifierError(errorMessage)
        }
    );
  }
  fillObj(id){
    this.i = this.UserList.findIndex(x => x.id == id);
    this.userObj = {...this.UserList[this.i]}
  }

  changePass(id){
    this.fillObj(id);

  }
  onClickSubmit_changePass(data){

    this.userServices.updateUserPassword( this.userObj.id , data.pass ).subscribe(
      res=>{
        this.swalService.Notifier('تم التعديل بنجاح ');
        this.pass="";
        // this.GetAllUsers();
      },
      err => {
        let errorMessage = err.message || ' خطآ ';
        this.swalService.NotifierError(errorMessage)
      }
      
    );

  }



  
}






