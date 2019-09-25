## Synopsis

Using React and Django REST framework, add the ability for a user to add services
(Hotels, Accommodations and Transportation) to a given trip. These services
should have a name, a location, a type and a cost. The sum of all the costs
on a Trip provides the sell price of said trip.

We appreciate you taking the time to do this, and ideally, you are spending no
more than 4 hours on this challenge. You can find a detailed explanation of the
task below (`The Task` header)

## What's the end goal?

We'd like to get a sense of how you work! We're looking for well-documented code,
which explains what you're doing, and more importantly, the reasoning behind it.
This will help us get a better understanding of your thinking process. Frequent,
and numerous commits are also encouraged, with sensible, and relevant commit messages.

## Getting Started

At G Adventures, we mostly run off MacOS and the instructions below assume
either a MacOS or Linux environment. Unfortunately, we are unable to supply
instructions in Windows at this time. Please do let us know if that's what you
generally use.

First, you'll need to get your environment set up. We recommend `Python 3.x`
and the latest version of node. Additionally, you'll want to:

- [Install pip](http://stackoverflow.com/questions/17271319/installing-pip-on-mac-os-x)
- [Install git](https://help.github.com/articles/set-up-git/)

Once you have these dependencies installed, you can go through the application
provisioning.

First, clone the repository:

	git clone git@github.com:gadventures/precious-challenge.git

You'll want to create a virtualenv to isolate this projects Python packages.
Since you are running Python 3, you can do:

	cd ./precious-challenge
	python -m venv ./ve

You'll now have `ve` directory wherever the above was run (ideally in the
`precious-challenge` directory). Next, you'll want to activate the virtualenv
and then install requirements (via `pip`)

	source ve/bin/activate
	pip install -r requirements.txt

Now you should be able to run the Django project:

	python manage.py runserver

Now onto the front-end! There's many approaches to integrating Django with the
front-end, but we've chosen to use webpack and the Django webpack loader for
this exercise.

First, install the package requirements via npm. Go into the top of the project
directory and:

	npm install

Now you can run `webpack`. We recommend using the `--watch` flag to have webpack
rebuild whenever the file is modified.

	webpack --watch

### Creating a git branch

Before you dive into the code, create a separate branch to do your work. 
The reason for this is so that you can issue a pull request, which will allow us
to review your code. To create a new branch:

	git checkout -b your_branch_name

We encourage, and recommend frequent commits.  That's good for us and you.
It helps us get a better understanding of your thought process, and problem
solving skills.

## The Task

We want you to create an application that lists the trips using React. Users
should be able to add services (Hotels, Accommodations and Transportation) to a
given trip.

This means you will add components which can add a service under one of those
categories. They should be saved to a model instance on the Django backend and
then rendered alongside the appropriate trip.

These services should have a name, a location, a type and a cost. The sum of 
all of the costs on a Trip provide the sell price for a trip. The frontend should
call the backend via an API call. The services you add will affect the
calculation of the trip cost.

We've placed a bit of dummy data and provided scaffolding both on the Django and
React side.

We recommend looking at the following views:

* View which lists all trips, at `https://127.0.0.1:8000/`
* View which listens for API calls, at `https://127.0.0.1:8000/api/`

And then identifying the code behind them, and working from there.

## When you're finished

Once you're ready to submit, you can create a pull request on the github project
page. After that, you're done!

## Stuck?

If you get stuck -- Please don't hesitate to email bartekc@gadventures.com. We are
looking for candidates who are not afraid to ask questions, and explore new ideas.
Asking questions will not hurt your chances.

## Thank You!

We're excited for the opportunity to work with you. We look forward to seeing
what you create.
jo
k
