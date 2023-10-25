# Career Canvas

1. Create a Cover Letter/Statement of Purpose from your resume/CV and a job description. This tool reads your resume from a pdf or docx file and reads the job description from a pdf/docx/text or a static web link. Then help the user create a cover letter for the job.
2. Find the most common words about your resume, and what the most fitting job titles based on the resume are.
3. Application Tracking: Keeps track of the job applications for a user. 

I implemented a very primitive version of a web app that will take the inputs and give outputs. Then you will update the cover letter based on your needs (non-factual/didn't like sentence etc). Then it will give a query to chatgpt and will do a back-and-forth process until you are satisfied with your cover letter. 


## Motivation

I faced this problem. Copying and pasting a resume from a pdf/docx, then finding the job description, writing queries etc is a hairy process. This utility tool can simplify it. 

## Installation

### Prerequisite: `pyenv`

`pyenv` simplifies Python version management, enabling you to seamlessly switch between 
Python versions for different project requirements.



https://github.com/pyenv/pyenv-installer

On macOS you can use [brew](https://brew.sh), but you may need to grab the `--HEAD` version for the latest:

```bash
brew install pyenv --HEAD
```

or

```bash
curl https://pyenv.run | bash
```

And then you should check the local `.python-version` file or `.envrc` and install the correct version which will be the basis for the local virtual environment. If the `.python-version` exists you can run:

```bash
pyenv install
```

This will show a message like this if you already have the right version, and you can just respond with `N` (No) to cancel the re-install:

```bash
pyenv: ~/.pyenv/versions/3.8.6 already exists
continue with installation? (y/N) N
```

### Prerequisite: `direnv`

`direnv` streamlines environment variable management, allowing you to isolate 
project-specific configurations and dependencies within your development environment.

https://direnv.net/docs/installation.html

```bash
curl -sfL https://direnv.net/install.sh | bash
```


### Prerequisite: `npm` and `Node.js`

Aside from the above setup, we also need to install `npm` and `Node.js` to run the frontend.

https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

```bash
brew install node
```

### Developer Setup

If you are a new developer to this package and need to develop, test, or build -- please run the following to create a developer-ready local Virtual Environment:

```bash
direnv allow
python --version
pip install --upgrade pip
pip install poetry
poetry install
```

### Usage

Once the above are complete, you can run the following command from project
folder to start the frontend:

```bash
rm -rf templates/frontend/.next
npm install   # Ensure dependencies are up to date
npm run build
npm start
```

Then you can open the browser and go to `http://localhost:3000` to see the frontend.