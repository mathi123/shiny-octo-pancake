# Contribution Guidelines

## Commit Message

When contributing to this project, please adhere to the conventional commit message rules as defined by the config-conventional configuration. This ensures a consistent commit history and helps in automating the release process. Below are the key rules to follow:

1. **Commit Message Structure**:
   - A commit message consists of a header, a body, and a footer.
   - The header is mandatory and should be in the format: `<type>(<scope>): <subject>`.
   - The body and footer are optional.

2. **Header**:
   - **Type**: Describes the category of the change. Common types include:
     - `feat`: A new feature
     - `fix`: A bug fix
     - `docs`: Documentation only changes
     - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
     - `refactor`: A code change that neither fixes a bug nor adds a feature
     - `perf`: A code change that improves performance
     - `test`: Adding missing tests or correcting existing tests
     - `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation
   - **Scope**: A noun describing a section of the codebase impacted by the change (e.g., `component`, `api`, `config`).
   - **Subject**: A short, imperative mood description of the change.

3. **Body**:
   - Provides additional contextual information about the change.
   - Should be concise and to the point.

4. **Footer**:
   - Used for referencing issues that this commit closes or affects.
   - Example: `Closes #123` or `Affects #456`.

5. **Examples**:
   - `feat(auth): add login functionality`
   - `fix(api): correct data fetching logic`
   - `docs(readme): update installation instructions`

By following these guidelines, you help maintain a clear and organized project history, making it easier for everyone to understand the changes and their purposes. Thank you for your contributions!
