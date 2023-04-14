CREATE DATABASE renReviews_db;
USE renReviews_db;

Create Table Addresses (
  id int auto_increment,
  lat double not null,
  lng double not null,
  city varchar(100) not null,
  street varchar(255) not null,
  nr varchar(5) not null,
  postalCode varchar(20) not null,
  country varchar(100) not null,
  PRIMARY KEY (id)
);

Create Table ResidenceAddresses (
  id int auto_increment,
  addressId int not null,
  floor varchar(50) not null,
  direction varchar(50) not null,
  PRIMARY KEY (id),
  FOREIGN KEY (addressId) REFERENCES Addresses(Id)
);

Create Table Reviews (
  id int auto_increment,
  userId int not null,
  userName varchar(120) not null,
  adminId int not null,
  residenceId int not null,
  review text not null,
  rating int not null,
  createdOn datetime not null,
  approvedOn datetime,
  anonymous boolean not null,
  approved int not null, # 0 - pending, 1 - approved, 3 - rejected
  PRIMARY KEY (id),
  FOREIGN KEY (residenceId) REFERENCES ResidenceAddresses(Id)
);
