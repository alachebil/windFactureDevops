export class User {
  readonly id: number;
  name: string;
  email: string;
  tel: string;
  validated: boolean; 
  role: string;

  constructor(data: Partial<User> = {}) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.email = data.email ?? '';
    this.tel = data.tel ?? '';
    this.validated = data.validated ?? false; 
    this.role = data.role ?? '';
  }
}


export class Partenaire extends User {
  companyName: string;
  address: string;
  companytype: string;
  logo?: File; 

  constructor(data: Partial<Partenaire> = {}) {
    super(data);
    this.companyName = data.companyName ?? '';
    this.address = data.address ?? '';
    this.companytype = data.companytype ?? '';
    this.logo = data.logo; 
  }
}
export class Employee extends User {

  post: string;

  department: string;
  secondName: string;


  constructor(data: Partial<Employee> = {}) {
    super(data);  // Assuming the User class is the base class
    this.post = data.post ?? '';
    this.department = data.department ?? '';
    this.secondName = data.secondName ?? '';
  }
}