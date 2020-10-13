
Insert into ClientType (Name, EditionDateTime) Values('Tipo de Client 1', GETDATE());
Insert into ClientType (Name, EditionDateTime) Values('Tipo de Client 2', GETDATE());
Insert into ClientType (Name, EditionDateTime) Values('Tipo de Client 3', GETDATE());
Insert into ClientType (Name, EditionDateTime) Values('Tipo de Client 4', GETDATE());

Insert into Client (EditionDateTime, SocialReason, FantasyName, CPF, RG, BirthDataTime, ClientTypeId)
Values(GETDATE(), 'Razão Social Cliente 1', 'Nome Fantasia Cliente 1', '111.111.111-11', '11.111.111-1', GETDATE(), 1);

Insert into ClientAddress (EditionDateTime, ClientId, Address, Number, Country, City, State, District, PostalCode)
Values(GETDATE(), 1, 'Address 1', 123, 'Country 1', 'City 1', 'State 1', 'District 1', '13215-565');
Insert into ClientAddress (EditionDateTime, ClientId, Address, Number, Country, City, State, District, PostalCode)
Values(GETDATE(), 1, 'Address 2', 1234, 'Country 2', 'City 2', 'State 2', 'District 2', '13215-333');

Insert into ClientPhone (ClientId, EditionDateTime, PhoneNumber)
Values (1, GETDATE(), '(11) 1234-5678');
Insert into ClientPhone (ClientId, EditionDateTime, PhoneNumber)
Values (1, GETDATE(), '(11) 4567-1545');
Insert into ClientPhone (ClientId, EditionDateTime, PhoneNumber)
Values (1, GETDATE(), '(11) 1111-2222');
