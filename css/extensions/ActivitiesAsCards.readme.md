### Boxes in different activities in an attempt to give them a *card* look.

This module will firstly define the shared styles of the "card". It will then also load in a list of files in the ```activitiesAsCards``` folder which will attempt to further refine individual elements and apply the "card" styles.

Notes:
- ```activitiesAsCards.scss``` will establish the "card" styles without affecting any individual elements, but it will attempt to load in files which *will affect individual elements*.
- If you do *not want a given element to be affected*, simply remove the corresponding .scss file from the output, the import will silently fail and the element will not be affected.
- The elements listed in the ```activitiesAsCards``` folder will have the shared "card" styles applied to them, so they may interfere established branding of a given output.
- If you want to turn *additional elements into cards* you can simply customize them and have them ```@extend %card-activity-wrapper;``` which will have them inherit the card styles.