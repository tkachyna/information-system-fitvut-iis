release: python manage.py migrate
web: gunicorn isystem.wsgi --log-file -
frontend: npm run dev
