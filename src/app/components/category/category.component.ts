import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/Models/Category';
import { CategoryList } from 'src/app/Models/CategoryList';
import { CategoryService } from 'src/app/services/category.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  tData:Category[]=[];
  tableData:MatTableDataSource<any> =new MatTableDataSource();
  @ViewChild(MatSort) sort:MatSort=new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchKey:string='';
  cList:CategoryList[]=[];

  constructor(private noticeService:NotificationService,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategoryList();
    this.getData();
  }

  getCategoryList(){
    this.categoryService.getCList().subscribe(data=>{
      this.cList=data;
    },
    err=>{

    })

  }

  getData(){
    this.categoryService.getCategory().subscribe(res=>{
      this.tData = res;
      this.tableData=new MatTableDataSource(this.tData);
      this.tableData.sort=this.sort;
      this.tableData.paginator=this.paginator;
    },
    err=>{
      console.log(err);
    })
  }

  searchCat(){
    this.categoryService.searchCat(this.searchForm.value).subscribe(res=>{
      this.tData = res;
      this.tableData=new MatTableDataSource(this.tData);
      this.tableData.sort=this.sort;
      this.tableData.paginator=this.paginator;
    },
    err=>{
      console.log(err);
    })

  }

  searchForm=new FormGroup({
    Title:new FormControl('',Validators.required)
  });


  onSearchClear(){
    this.searchKey='';
    this.filter();
  }
  filter(){
    this.tableData.filter=this.searchKey.trim().toLowerCase();

  }
  applyFilter(event:Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.tableData.filter=filterValue.trim().toLowerCase();
  }

  setUpFilter(colName:any){
    this.tableData.filterPredicate = (data:string,filter:string)=>{
      const text = data[colName] && data[colName].toLowerCase()|| '';
      return text.indexOf(filter) !==-1;
    }
  }
  
  displayedColumns:string[]=['categoryId',
                              'categoryName',
                              'isActive',
                             ];


                             

 

}
