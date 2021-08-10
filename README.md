
## Installation

## Backend setup

Step 1: Clone the Repository 

Step2: Go to 3.state-Manage with command:
```bash
  git checkout 3.state-Manage
```

Step3: then go there where backend

Step4: the run this cmd:
```bash
  python -m venv myenv
```
### then activate python environment
```bash
  pip install -r requirements.txt
```
step5: run these cmd

```bash
  python manage.py makemigrations api
```

```bash
  python manage.py migrate api
```

```bash
  python manage.py createsuperuser
```
```bash
  python manage.py runserver
```

that's it 🙂🤞


## FrontEnd Setup

### Recommend
```bash
  yarn start
```

Or 

```bash
  npm start
```


Recommend using Yarn🤞
       
