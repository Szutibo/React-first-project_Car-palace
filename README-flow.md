# Tibi's Car Palace

## Első komoly gyakorló projektem

## Első lépések:

-> npm install
-> 2db terminált nyitni
-> terminál 1: cd car-palace-backend ->  node index.js
-> terminál 2: cd car-palace -> npm start

Enjoy!

## A web appról dióhéjban

Alapvetően 5 oldalból áll:
    - Kezdőoldal, nagyon egyszerű bemutatkozó oldal, két kattintható képpel, amelyek a Keresés és a Hirdetés feladása oldalakra visznek
    - Keresés, kis adatbázis kártyákba foglalva, amely dinamikus
    - Hirdetés feladása, minden mező kötelező, a validáció ezt figyeli, kitöltés után hirdetés feladása gombra kattintás és a hirdetés létre is lett hozva
    - Hirdetés módosítása, először ID alapján megkeresi a kívánt hirdetést (az ID minden esetben látszik a hirdetés kártyáján), majd ezután több opciónk van:
        - módosíthatjuk a kívánt hirdetés minden adatát, itt nem kötelező mindent kitölteni
        - törölhetjük a keresett hirdetést
        - a mégse gombra kattintva új keresést kezdhetünk
    - Error oldal, amennyiben az URL nem megfelelő, ide fog irányítani minket az oldal, ahonnan könnyen visszatérhetünk a kezdőlapra
