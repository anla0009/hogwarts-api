# Pseudokode

Alle endpoints følger få mønstre. Fejl fra databasen (ugyldigt id, manglende reference, rækken bruges af noget andet, findes allerede) fanges af en fælles fejlhåndtering, der sender 400 eller 409. 500 bruges kun ved uventede fejl.

## GET /houses (hent alle)
1. Bed repository om alle houses, sorteret efter id.
2. Svar 200 med listen.

## GET /houses/:id (hent én)
1. Bed repository om det house, der har id'et.
2. Hvis det ikke findes, svar 404.
3. Ellers svar 200 med house.

## GET /teachers og GET /teachers/:id
Som GET /houses, men teacher hentes sammen med navnet på sit house.

## POST /teachers
1. Læs `name` og `house_id` fra body.
2. Hvis en af dem mangler, svar 400.
3. Bed repository om at oprette teacher.
4. Svar 201 med den nye teacher.

## PUT /teachers/:id
1. Læs `name` og `house_id` fra body.
2. Hvis en af dem mangler, svar 400.
3. Bed repository om at rette teacher med id'et.
4. Hvis teacher ikke findes, svar 404.
5. Ellers svar 200 med den rettede teacher.

## DELETE /teachers/:id
1. Bed repository om at slette teacher med id'et.
2. Hvis ingen række blev slettet, svar 404.
3. Hvis teacher stadig underviser i et course, afviser databasen sletningen, og fejlhåndteringen svarer 409.
4. Ellers svar 204 uden indhold.

## Students (GET alle, GET én, POST, PUT, DELETE)
Præcis som teachers, men med students. Sletter man en student, fjernes de rækker, der knytter studenten til courses, automatisk.

## GET /courses
Som GET /houses, men hvert course hentes sammen med navnet på sin teacher.

## GET /courses/:id
1. Bed servicen om course med sine students.
2. Servicen henter course og derefter de students, der er på det, og lægger dem sammen.
3. Hvis course ikke findes, svar 404.
4. Ellers svar 200 med course og dets students.

## POST /courses
Som POST /teachers, men med `name` og `teacher_id`. Svar 201.

## PUT /courses/:id
1. Læs `name` fra body. Hvis den mangler, svar 400.
2. Bed repository om at ændre navnet på course (kun navnet kan ændres her).
3. Hvis course ikke findes, svar 404. Ellers svar 200 med course.

## DELETE /courses/:id
Som DELETE /teachers/:id. Rækkerne, der knytter students til courset, slettes automatisk. Svar 204.

## PUT /courses/:id/teacher (skift teacher)
1. Læs `teacher_id` fra body. Hvis den mangler, svar 400.
2. Bed repository om at sætte ny teacher på course.
3. Hvis course ikke findes, svar 404.
4. Hvis teacher ikke findes, afviser databasen det, og fejlhåndteringen svarer 400.
5. Ellers hent course med students og svar 200.

## POST /courses/:id/students (tilføj student)
1. Læs `student_id` fra body. Hvis den mangler, svar 400.
2. Tjek, at course findes. Hvis ikke, svar 404.
3. Bed repository om at knytte studenten til course.
4. Hvis studenten ikke findes, svarer fejlhåndteringen 400. Hvis studenten allerede er på course, svarer den 409.
5. Hent course med students og svar 201.

## DELETE /courses/:id/students/:studentId (fjern student)
1. Bed repository om at fjerne koblingen mellem course og student.
2. Hvis koblingen ikke fandtes, svar 404.
3. Ellers svar 204 uden indhold.
