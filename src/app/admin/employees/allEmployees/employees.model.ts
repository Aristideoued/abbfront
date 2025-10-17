import { formatDate } from '@angular/common';


/*

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private String statut;
    private String sexe;
*/
export class Plateforme {
  id: number;
 
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  sexe: string;
  statut:string;
 

  
  // Nouvelles propriétés pour correspondre au form-dialog
  /*name: string; // Alias pour nom complet
  birthDate?: Date | string;
  role: string; // Alias pour titre
  mobile: string; // Alias pour telephone
  department: string; // Alias pour departement (en anglais)
  degree?: string;
  gender?: string;
  address?: string;
  joiningDate?: Date | string;
  salary?: number;
  lastPromotionDate?: Date | string;
  employeeStatus?: string;
  workLocation?: string;*/

  constructor(employees: Partial<Plateforme>) {
    this.id = employees.id || this.getRandomID();
    this.prenom = employees.prenom || 'Actif';
    this.nom = employees.nom || '';
    this.sexe = employees.sexe || '';
    this.telephone = employees.telephone || '';
    this.email = employees.email || '';
    this.statut = employees.statut || '';

    
    // Initialiser les nouvelles propriétés
  /*  this.name = employees.name || this.nomComplet;
    this.birthDate = employees.birthDate || '';
    this.role = employees.role || this.titre;
    this.mobile = employees.mobile || this.telephone;
    this.department = employees.department || this.departement;
    this.degree = employees.degree || '';
    this.gender = employees.gender || '';
    this.address = employees.address || '';
    this.joiningDate = employees.joiningDate || '';
    this.salary = employees.salary || 0;
    this.lastPromotionDate = employees.lastPromotionDate || '';
    this.employeeStatus = employees.employeeStatus || this.statut;
    this.workLocation = employees.workLocation || '';*/
  }

  // Getter pour obtenir le nom complet
  /*get nomComplet(): string {
    return `${this.prenom} ${this.nom}`.trim();
  }*/


  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}