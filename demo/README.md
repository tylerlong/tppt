# Untitled App

## Manage dependencies

### Upgrade all

```zsh
pip-compile --upgrade
```

### Add/remove a dependency

Edit `requirements.in` and run the following command:

```zsh
pip-compile && pip-sync
```
