// Deletes relationships without a creation date
match ()-[r]->()
where not exists (r.created)
delete r;

// Deletes recipes with no title
match (n:Recipe)
where not exists(n.title)
detach delete n;

// Deletes persons with no first or last name
match (p:Person)
where not exists (p.lastName or p.lastName)
detach delete p;