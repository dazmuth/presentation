### Centers the content layout in the Nova output, instead of it being full-width

This module will firstly attempt to constrain the width of and center the content area. It will then also load in a list of files in the ```centeredElements``` folder which will attempt to further refine individual elements to work better in a centered, width-constrained content area.

Notes:
- ```centeredNovaLayoutStandardStyle.scss``` will constrain the width of and center the content area itself in a standard way (Text content has width 100%), without affecting any individual elements, but it will attempt to load in files which *will affect inidividual elements*.
- If you do *not want a given element to be affected*, simpley remove the corresponding .scss file from the output, the import will silently fail and the element will not be affected.
- The elements listed in the ```centeredElements``` folder will only have their widths and margins affected, not their general appearance, so it should be safe to use these files in a variety of outputs and brandings.
