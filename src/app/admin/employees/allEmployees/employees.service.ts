import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {  Plateforme } from './employees.model';
import { environment } from 'environments/environment.development';
import { AuthService } from '@core/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly API_URL = 'assets/data/employees.json';
  token: string;
  
  constructor(private httpClient: HttpClient,private authService: AuthService) {
        this.token='Basic ' + window.btoa(environment.username + ":" + environment.password);
    
  }

  /** GET: Récupérer tous les employés */
  getPlateforme2(): Observable<Plateforme[]> {

     let headers= new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:this.token})
      
    return this.httpClient
      .get<Plateforme[]>(environment.apiUrl+"users",{headers:headers})
      .pipe(
        map((data: any[]) => 
        
          data.map(item => new Plateforme(item))
      ),
        catchError(this.handleError)
      );
  }

   getPlateforme(): Observable<Plateforme[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    return this.httpClient.get<Plateforme[]>(environment.apiUrl+"parrains", { headers });
  }
     getStat(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    return this.httpClient.get<any>(environment.apiUrl+"stats/counts", { headers });
  }

    getPlateformeByUserId(): Observable<Plateforme[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    return this.httpClient.get<Plateforme[]>(environment.apiUrl+"plateforme/user/"+this.authService.currentUserValue.userId, { headers });
  }

    sendMail(id:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+this.authService.currentUserValue.token
    });

    return this.httpClient.get<any>(environment.apiUrl+"sendmail/"+id, { headers });
  }
  /** POST: Ajouter un nouvel employé */



      updatePlateforme(employee: any): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.authService.currentUserValue.token
      });
  
      const plateformeData = {
       
        nom:employee.nom,
        token:employee.token,
        userId:employee.userId,
        url: employee.url,
        callbackUrl:employee.callbackUrl,
        commissionAgregateur: employee.commissionAgregateur
        
       
      };

      console.log("Plateforme envoyé============> ",plateformeData)
  
      return this.httpClient
        .put<any>(environment.apiUrl + "plateforme/update/"+employee.id,JSON.stringify(plateformeData) , { headers })
        .pipe(
          map((response) => new Plateforme({
          id: response.id || employee.id,
            nom: response.nom || employee.nom,
            prenom: response.prenom || employee.prenom,
            sexe: response.sexe || employee.sexe,
            statut: response.statut || employee.statut,
            email: response.email || employee.email,
            telephone: response.telephone || employee.telephone
           
          })),
          catchError(this.handleError)
        );
    }


    addPlateforme(employee: Plateforme): Observable<Plateforme> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.authService.currentUserValue.token
      });
  
       const plateformeData = {
      
            nom:  employee.nom,
            prenom:  employee.prenom,
            sexe:  employee.sexe,
            statut:  employee.statut,
            email:  employee.email,
            telephone:  employee.telephone
       
        
       
      };

      console.log("Plateforme envoyé============> ",plateformeData)
  
      return this.httpClient
        .post<any>(environment.apiUrl + "parrains",JSON.stringify(plateformeData) , { headers })
        .pipe(
          map((response) => new Plateforme({
            id: response.id || employee.id,
            nom: response.nom || employee.nom,
            prenom: response.prenom || employee.prenom,
            sexe: response.sexe || employee.sexe,
            statut: response.statut || employee.statut,
            email: response.email || employee.email,
            telephone: response.telephone || employee.telephone
           
          })),
          catchError(this.handleError)
        );
    }


       deletePlateforme(id: number): Observable<Plateforme> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+this.authService.currentUserValue.token
      });
  
   
      return this.httpClient
        .delete<any>(environment.apiUrl + "plateforme/delete/"+id , { headers })
        .pipe(
          map((response) => new Plateforme({
            id:  id
           
           
          
          })),
          catchError(this.handleError)
        );
    }

  /*addEmployee2(employee: Employees): Observable<Employees> {
    return this.httpClient.post<Employees>(this.API_URL, employee).pipe(
      map(() => {
        return employee; // retourner l'employé nouvellement ajouté
      }),
      catchError(this.handleError)
    );
  }*/

  /** PUT: Mettre à jour un employé existant */
 /* updateEmployee2(employee: Employees): Observable<Employees> {
    return this.httpClient.put<Employees>(`${this.API_URL}`, employee).pipe(
      map(() => {
        return employee; // retourner l'employé mis à jour
      }),
      catchError(this.handleError)
    );
  }*/

  /** DELETE: Supprimer un employé par ID */
  /*deleteEmployee2(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.API_URL}`).pipe(
      map(() => {
        return id; // retourner l'ID de l'employé supprimé
      }),
      catchError(this.handleError)
    );
  }

  */

  /** Gérer les erreurs d'opération Http qui ont échoué */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Une erreur s\'est produite:', error.message);
    return throwError(
      () => new Error('Quelque chose s\'est mal passé; veuillez réessayer plus tard.')
    );
  }
}