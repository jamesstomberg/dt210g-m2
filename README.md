# DT210G - Moment 2

Skapa en ToDo-applikation med React och TypeScript som hanterar dynamisk data i kommunikation med ett separat Back-End API.

## Information

- Länk till publicerad webbplats på Netlify: https://celadon-muffin-970f91.netlify.app/
- Länk till Github-repo för uppgiften: https://github.com/jamesstomberg/dt210g-m2
- Kuriosa: länk till Backend API (WordPress med egen posttyp "todo" och egna REST-routes): https://test.skovdebowling.se/wp-json/todo-open-api/v1/
-- /Read/
-- /Create/
-- /Update/
-- /Delete/

## Beskrivning

Uppgiften består av en Front-End applikation skapad med hjälp av React, TypeScript och Vite. Denna kommunicerar med ett Back-End API baserat på WordPress för att kunna skapa, hantera, redigera och radera ToDo:s (Att-göra-uppgifter).

## Kommentarer

Gränssnittet lämnar lite att önska. Bör ha strukturerat komponenterna annorlunda och/eller dragit nytta av Context API. Det hade blivit besvärligt att vidareutveckla denna applikation.

Borde kanske inte ha använt samma komponent (Form) för att skapa och redigera ToDo:s. Det faktum att jag gjorde det försvårade uppgiften. Alternativt skulle jag ha strukturerat komponenten på ett smartare sätt för att kunna hantera olika scenarier.

Strukturen för att hantera status per ToDo i ett objekt kan också ha varit något onödigt. I efterhand hade jag hellre lagrat det som en siffra eller sträng (tillåtit ett begränsat antal värden både på klient och server) samtidigt som det hade varit lättare att jobba med Front-End.