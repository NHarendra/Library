export interface IUsers {
    userName: string;
    address: string;
    phoneNo: string;
    typeOfUser: string;
    activeBooksIssued: number;
    booksReserved: number;
    userRole: string;
    password: string;
    isActive: boolean;
}
export class LibUsers implements IUsers {
    userId: number;
    userName: string;    
    address: string;
    phoneNo: string;
    typeOfUser: string;
    activeBooksIssued: number;
    booksReserved: number;
    userRole: string = "User";
    password: string;
    isActive: boolean = true;
    createdDt: Date;
    issuebook: BookIssue;
}
export interface IBooks {
    bookName: string;
    author: string;
    rent: number;
    price: number;
    quantity: number;
    isActive: boolean;
    isReserved: boolean;
}
export class LibBooks implements IBooks {
    bookId: number;
    bookName: string;    
    author: string;
    rent: number;
    price: number;
    quantity: number;
    isActive: boolean = true;
    isReserved: boolean = false;
    createdDt: Date;
}
export interface IBookIssue{
    userId: number;
    bookId:number;
    dateOfIssue: Date;
    dateOfReturn: Date;
    totalRent: number;
    isReturned: boolean;
    book: LibBooks;
    user: LibUsers;
}
export class BookIssue implements IBookIssue{
    issueId: number;
    userId: number;    
    bookId: number;
    dateOfIssue: Date;
    dateOfReturn: Date;
    totalRent: number;
    isReturned: boolean;
    book: LibBooks;
    user: LibUsers;
}
export interface IPayment {
    userId: number;
    bookId: number;
    totalRent: number;
    paymentDate: Date;
    book: LibBooks;
    user: LibUsers;
}

export class Payment implements IPayment{
    paymentId: number;
    userId: number;    
    bookId: number;
    totalRent: number;
    paymentDate: Date;
    book: LibBooks;
    user: LibUsers;
}

export interface IBookReserve{
    userId: number;
    bookId: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    book: LibBooks;
    user: LibUsers;
}

export class BookReserve implements IBookReserve{
    reserveId: number;
    userId: number;
    bookId: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    book: LibBooks;
    user: LibUsers;
}
export class UserNdBookId {
    userId: number;
    bookId: number;
}

export class KVPair {
    id: number;
    name: string;
}