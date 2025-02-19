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
