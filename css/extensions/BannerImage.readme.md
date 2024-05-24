## Banner Image

This snippet will redirect Figures that have a LOM attribute of "BannerImage" OR a ```borderType``` attribute that *contains* "BannerImage" anywhere in it (which allows it to be combined with other customizations) and sends it to a new template which will help achieve the effect. This effect is that the image will attempt to fill the full space of its container element, but will have ```min-height``` and ```max-height``` constraints to ensure that the banner does not become too large or too small. The image will also be clipped and masked by this container.

### Notes About Compatibilty

This snippet will remove any *extra* functionality associated with Figures, like overlay objects, titles, captions, image behaviors, etc, as none of these make sense in the context of a banner image.

### Making the banner *truly* full-width

This snippet will make the banner image full-width with regards to its immediate container (this is normally ```#PageBody```), so it will respect any margins or paddings associated with this container. If it's desired to get a *truly* full-width banner image, this snippet can be safely combined with the **BreakoutElement** module by ensuring that the **BreakoutElement** module's selector class is applied to the same Figure element. This can be done by hardcoding the class in BannerImage.html, applying a relevant ```borderType``` attribute to the figure, or filling in the ```class``` attribute on the Figure via ```config/associations.yml```.

#### SCSS Configuration

Because of the extent to which configuration is possible, configuration variables are set up as SCSS maps (similar to JS objects) and will be printed directly. This means that you can apply as few or as many properties as you need to achieve the desired effect. Inline documentation is available in ```bannerImageConfig.scss```. Please pay attention to the syntax used in SCSS maps, as commas "," are used instead of semi-colons ";" for line termination.
