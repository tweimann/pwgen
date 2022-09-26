# pwgen
docker-ready password generator

## credits
### files used for passphrase-generation
- [dwyls english word list](https://github.com/dwyl/english-words/) (i used words_alpha.txt)
- [netzmafia's german word & name list](http://www.netzmafia.de/software/wordlists/)
#### i used this command to filter out the non-alpha words: 
```bash
grep -x '[[:alpha:]]*' <path-to-txt-file> > wl_<scope>.txt
```

### used libraries
- [colors](https://www.npmjs.com/package/colors)
- [vue](https://www.npmjs.com/package/vue)