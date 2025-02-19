# CodeBeaver GitHub Action

This action triggers CodeBeaver to generate unit tests for your pull requests automatically. CodeBeaver analyzes your code changes and creates comprehensive test suites, helping maintain high test coverage with minimal effort.

## Features

- Automatically triggers test generation on pull requests
- Uses CodeBeaver's AI-powered analysis to create relevant tests
- Supports all languages and frameworks that CodeBeaver supports
- Integrates seamlessly with GitHub's pull request workflow

## Usage

1. After you [signed up for CodeBeaver](https://app.codebeaver.ai/login), get your CodeBeaver API key from the [Team page](https://app.codebeaver.ai/team).

2. Add the API key to your repository's secrets:

   - Go to your repository's Settings
   - Navigate to Secrets and Variables > Actions
   - Create a new secret named `CODEBEAVER_API_KEY`

3. Create a workflow file (e.g., `.github/workflows/codebeaver.yml`):

```yaml
name: CodeBeaver Test Generation

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  generate-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: codebeaver-ai/codebeaver-action@v1
        with:
          api-key: ${{ secrets.CODEBEAVER_API_KEY }}
```

## Inputs

| Input        | Description                     | Required | Default            |
| ------------ | ------------------------------- | -------- | ------------------ |
| `api-key`    | CodeBeaver API Key              | Yes      | N/A                |
| `repository` | Repository in owner/repo format | No       | Current repository |
| `pr-number`  | Pull request number             | No       | Current PR number  |

## Example with all options

```yaml
- uses: codebeaver-ai/codebeaver-action@v1
  with:
    api-key: ${{ secrets.CODEBEAVER_API_KEY }}
    repository: "octocat/Hello-World"
    pr-number: "123"
```

## Roadmap

- Trigger test generation on push
- Trigger test generation on schedule
- Trigger test generation on comment

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

# Contributing guidelines

# CONTRIBUTING.md

# Contributing to CodeBeaver GitHub Action

We love your input! We want to make contributing to the CodeBeaver GitHub Action as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with Github

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We Use [Github Flow](https://guides.github.com/introduction/flow/index.html)

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using Github's [issue tracker](https://github.com/codebeaver-ai/codebeaver-action/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/codebeaver-ai/codebeaver-action/issues/new); it's that easy!

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md).
