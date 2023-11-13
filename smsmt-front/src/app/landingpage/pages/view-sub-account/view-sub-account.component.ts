import { Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
import { ToastrService } from 'ngx-toastr';
import { SousCompte } from 'src/entity/sous.compte.entity';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-sub-account',
  templateUrl: './view-sub-account.component.html',
  styleUrls: ['./view-sub-account.component.css']
})
export class ViewSubAccountComponent {
  displayedColumns: string[] = ['login', 'nom', 'tel', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hide = true;

  sousCompteUpdate = {
    login: "",
    mdp:"",
    nom:"",
    tel:""
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




  donnees:  any = {}; // Assurez-vous que le type de données correspond à la structure de votre modèle.
  parent!: string;
  selectedItemId!: number;


  constructor( private http: HttpClient, private toastr: ToastrService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const user = params['user'];
      const phone = params['phone'];
      console.log('user:', user);
      console.log('Phone:', phone);

      this.parent = user
    })

    console.log(this.parent);

    const url = `http://localhost:8080/sousCompte/view/${this.parent}`;

    // Effectuez la requête GET.
    this.http.get<any[]>(url).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });


  }

  showSuccess() {
    this.toastr.success('sub-account deleted');
  }
  showError(){
    this.toastr.error('error');
  }
  showWarning(){
    this.toastr.warning("The provided sub-account login already exists")
  }

  edit(id:number,login: string, nom: string, tel: string, mdp:string){
    this.sousCompteUpdate.login = login;
    this.sousCompteUpdate.nom = nom;
    this.sousCompteUpdate.tel = tel
    this.selectedItemId = id
    this.sousCompteUpdate.mdp = mdp

  }

  saveEdit(){

    this.http.put(`http://localhost:8080/sousCompte/update/${this.selectedItemId}`,this.sousCompteUpdate)
    .subscribe(
      (response) => {

          console.log('Données mises à jour avec succès', response);

          console.log(this.sousCompteUpdate)
          window.location.reload();
          // Effectuez des actions supplémentaires si nécessaire
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour des données', error);
        this.showWarning()
      }
    );
  }

  sousCompte!:number;
  loginSub!:string
  getId(id:number, login:string){
    this.sousCompte = id
    this.loginSub = login
    console.log(this.loginSub)
  }


  deleteCompte(){
    this.http.delete(`http://localhost:8080/sousCompte/delete/${this.sousCompte}`).subscribe(() => {
      // Mettez à jour la source de données après la suppression
      this.dataSource.data = this.dataSource.data.filter((element: any) => element.id !== this.sousCompte);
      this.showSuccess();
    },
    (error:any) => {
      // Exécutez ce bloc si la suppression échoue
      console.error('Une erreur s\'est produite :', error);
      this.showError();
    });

  }



}
