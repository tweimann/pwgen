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
this will automatically run the image and forward the port 5000 to access the web page

## intention
- i wanted to solve the following errors in current password generators:
  - most password generators are not (F)OSS and also not easily deployable over docker
  - i mostly use passphrases, but the only good passphrase generator i found so far is the one from bitwarden
- this is just a project i sometimes work on in my free-time, so there isn't any real support or regular updates

## things to know
- input validation is kinda shit rn, working on that
- the passwords/-phrases are generated server-side. in the future, the passwords might be generated client-side, but the wordlists used for the passphrases are too big to download them every time you load the page (about 4 MB vs 200 KB)
- site is not optimized for mobile usage (yet). it's usable, but not good

## credits
### files used for passphrase-generation
- [dwyls english word list](https://github.com/dwyl/english-words/) (i used words_dictionary.json)
- [netzmafia's german word & name list](http://www.netzmafia.de/software/wordlists/)
- i used this command to filter out the non-alpha words: 
```bash
grep -x '[[:alpha:]]*' <path-to-txt-file> > wl_<scope>.txt
```
- and this command to sort-of convert the lists to json:
```bash
sed 's/.*/"&",/g' wl_names.txt > wl_names.txt.test
```

### used libraries
- [colors](https://www.npmjs.com/package/colors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [querystring](https://www.npmjs.com/package/querystring)
