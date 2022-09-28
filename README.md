# pwgen
docker-ready password and passphrase generator
check out the docker-image at [tweimann/pwgen](https://hub.docker.com/r/tweimann/pwgen)

## installation
to run the image, execute the following command:
```bash
docker run -p 5000:5000\
  -e PORT=5000\
  -e DEBUG=false\
  -e TELEMETRY=false\
  -e IMPRINTADDR="<link-to-your-imprint-goes-here>"\
  tweimann/pwgen
```

## credits
### files used for passphrase-generation
- [dwyls english word list](https://github.com/dwyl/english-words/) (i used words_dictionary.json)
- [netzmafia's german word & name list](http://www.netzmafia.de/software/wordlists/)
#### i used this command to filter out the non-alpha words: 
```bash
grep -x '[[:alpha:]]*' <path-to-txt-file> > wl_<scope>.txt
```
#### and this command to kind-of convert the others to json:
```bash
sed 's/.*/"&",/g' wl_names.txt > wl_names.txt.test
```

### used libraries
- [colors](https://www.npmjs.com/package/colors)
- [vue](https://www.npmjs.com/package/vue)
