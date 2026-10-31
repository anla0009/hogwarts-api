# Hogwarts Course Management System – backend

Backend (Node.js, Express og PostgreSQL) med et REST API til houses, teachers, students og courses.
Der er ingen frontend.

## Kom i gang

Kræver Node 20.6 eller nyere og PostgreSQL.

1. Opret en tom database i pgAdmin, der hedder `hogwarts`.
2. Åbn et Query Tool på databasen, og kør filen `database/hogwarts.sql`. Den opretter alle tabeller med eksempeldata.
3. Kopiér `.env.example` til `.env`, og skriv dit PostgreSQL-password i `PGPASSWORD`.
4. Kør `npm install` og derefter `npm start`.
5. API'et kører nu på http://localhost:3000.

## Endpoints

| Method | Route | Beskrivelse | Status |
| --- | --- | --- | --- |
| GET | /houses | Hent alle houses | 200 |
| GET | /houses/:id | Hent ét house | 200, 404 |
| GET | /teachers | Hent alle teachers | 200 |
| GET | /teachers/:id | Hent én teacher | 200, 404 |
| POST | /teachers | Opret en teacher (`name`, `house_id`) | 201, 400 |
| PUT | /teachers/:id | Ret en teacher (`name`, `house_id`) | 200, 400, 404 |
| DELETE | /teachers/:id | Slet en teacher | 204, 404, 409 |
| GET | /students | Hent alle students | 200 |
| GET | /students/:id | Hent én student | 200, 404 |
| POST | /students | Opret en student (`name`, `house_id`) | 201, 400 |
| PUT | /students/:id | Ret en student (`name`, `house_id`) | 200, 400, 404 |
| DELETE | /students/:id | Slet en student | 204, 404 |
| GET | /courses | Hent alle courses med teacher | 200 |
| GET | /courses/:id | Hent ét course med teacher og students | 200, 404 |
| POST | /courses | Opret et course (`name`, `teacher_id`) | 201, 400 |
| PUT | /courses/:id | Ret navnet på et course (`name`) | 200, 400, 404 |
| DELETE | /courses/:id | Slet et course | 204, 404 |
| PUT | /courses/:id/teacher | Skift teacher på et course (`teacher_id`) | 200, 400, 404 |
| POST | /courses/:id/students | Tilføj en student til et course (`student_id`) | 201, 400, 404, 409 |
| DELETE | /courses/:id/students/:studentId | Fjern en student fra et course | 204, 404 |

Houses kan kun læses. 500 bruges kun ved uventede fejl.

## Test af endpoints

Filen `tests/hogwarts.postman_collection.json` indeholder en test til hvert endpoint, plus tre fejlcases.
Den kan importeres i Postman, Insomnia og Bruno.

1. Importér filen. Adressen ligger i variablen `baseUrl` (`http://localhost:3000`).
2. Sørg for, at databasen er frisk: kør `database/hogwarts.sql` igen.
3. Kør requests ovenfra og ned. Nogle bruger id'er, som tidligere requests har oprettet (fx rettes og slettes teacher 5, som "Create teacher" opretter).
4. I Postman og Bruno kontrollerer scripts statuskoden. I Insomnia ser du statuskoden i svaret.

Vil du køre dem igen, så nulstil databasen først med `database/hogwarts.sql`.

## Struktur

```
server.js          starter Express og kobler routes på
db.js              forbindelse til PostgreSQL
routes/            kun method og sti
controllers/       request og response
services/          regler, der kræver mere end at sende data videre
repositories/      al SQL
middleware/        oversætter fejl til statuskoder
database/          SQL-filen
tests/             test-collection
```

Pseudokode for endpoints står i `PSEUDOKODE.md`.

## Brug af AI

Jeg har brugt AI (Claude, og tidligere en anden AI-chatbot til at restore min database) som hjælp til denne aflevering. Her er en ærlig oversigt:

**Det jeg selv har lavet**
- Databasedesignet fra første opgave (tabellerne houses, teachers, students, courses og course_students).
- Sat PostgreSQL og pgAdmin op og kørt backenden på min computer.
- Testet endpoints i Insomnia og rettet de fejl, jeg stødte på.

**Det AI har lavet**
- Det meste af koden: routes, controllers, services og repositories som JavaScript modules.
- SQL-filen, test-collectionen, README.md og PSEUDOKODE.md.
- Min første version af backenden opfyldte ikke alle krav i opgaven (alt lå i én fil med require, og der blev brugt 500 ved forventelige fejl). AI omstrukturerede den, så den følger opgavens krav.

**Hvorfor jeg brugte AI**
Jeg havde mindre tid end planlagt på grund af nogle ting i mit personlige liv, og derfor valgte jeg at bruge AI til at hjælpe mig igennem opgaven.

**Hvor mine udfordringer ligger**
Jeg er klar over at brug af AI går imod pointen med opgaven. Som jeg forstår det er det en måde at se om vi har problemer eller udfortninger som du kan hjælpe os igennem med mere undervisning.
Så jeg vil her give forskelig punkter som jeg har problemer med.
- errorHandler.js: hvorfor den har fire parametre, og hvordan fejl ender dér
- Statuskoder: hvornår man bruger 200, 201, 204, 400, 404 og 409
- Parametre i SQL ($1, $2), og hvorfor man ikke bare sætter værdier ind i teksten (SQL injection)
- Hvordan Node taler med PostgreSQL (pool.query, pg og .env)
