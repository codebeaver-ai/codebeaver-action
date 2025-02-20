# CodeBeaver GitHub Action

This action triggers CodeBeaver to generate unit tests for your code changes automatically. CodeBeaver analyzes your code changes and creates comprehensive test suites, helping maintain high test coverage with minimal effort.

## Features

- Automatically triggers test generation on pull requests or push events
- Uses CodeBeaver's AI-powered analysis to create relevant tests
- Supports all languages and frameworks that CodeBeaver supports
- Integrates seamlessly with GitHub's workflows
- Configurable action types for different CodeBeaver operations

## Usage

1. After you [signed up for CodeBeaver](https://app.codebeaver.ai/login), get your CodeBeaver API key from the [Team page](https://app.codebeaver.ai/team).

2. Add the API key to your repository's secrets:

   - Go to your repository's Settings
   - Navigate to Secrets and Variables > Actions
   - Create a new secret named `CODEBEAVER_API_KEY`

3. Create a workflow file (e.g., `.github/workflows/codebeaver.yml`):

### For Pull Requests

```yaml
name: CodeBeaver Test Generation on PR

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  generate-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: codebeaver-ai/codebeaver-action@v0.1.0
        with:
          api-key: ${{ secrets.CODEBEAVER_API_KEY }}
          action-type: "analyze-and-generate"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### For Push Events

```yaml
name: CodeBeaver Test Generation on Push

on:
  push:
    branches: [main, develop] # Customize branches as needed

jobs:
  generate-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: codebeaver-ai/codebeaver-action@v0.1.0
        with:
          api-key: ${{ secrets.CODEBEAVER_API_KEY }}
          action-type: "analyze-and-generate"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Input         | Description                     | Required | Default                                   |
| ------------- | ------------------------------- | -------- | ----------------------------------------- |
| `api-key`     | CodeBeaver API Key              | Yes      | N/A                                       |
| `action-type` | Type of action to perform       | No       | "analyze-and-generate"                    |
| `repository`  | Repository in owner/repo format | No       | Current repository                        |
| `pr-number`   | Pull request number             | No       | Current PR number (empty for push events) |
| `commit_sha`  | Commit SHA to analyze           | No       | Current commit SHA                        |

### Action Types

The `action-type` parameter determines what operation CodeBeaver will perform:

- `analyze` - Analyzes your changes and provides tests results and bug detection analysis as a comment
- `analyze-and-generate` - Does everything `analyze` does, plus generates test files and creates a new PR with the changes
- `dry-run` - Performs analysis and shows what would be generated without making any changes

Each action type provides different levels of automation:

- Use `analyze` when you want CodeBeaver to run existing tests and provide results as comments
- Use `analyze-and-generate` when you want CodeBeaver to run existing tests, generate new tests, and propose them via a new PR
- Use `dry-run` during initial setup or to preview CodeBeaver's analysis

## Example with all options

### Pull Request Example

```yaml
- uses: codebeaver-ai/codebeaver-action@v0.1.0
  with:
    api-key: ${{ secrets.CODEBEAVER_API_KEY }}
    repository: "octocat/Hello-World"
    pr-number: "123"
    action-type: "analyze-and-generate"
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Push Event Example

```yaml
- uses: codebeaver-ai/codebeaver-action@v0.1.0
  with:
    api-key: ${{ secrets.CODEBEAVER_API_KEY }}
    repository: "octocat/Hello-World"
    action-type: "analyze-and-generate"
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Roadmap

- Trigger test generation on schedule
- Trigger test generation on comment

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
