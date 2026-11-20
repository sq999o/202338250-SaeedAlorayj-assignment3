// Keep the fetched list in memory so changing a control never repeats the request.
const language = document.querySelector("#repo-language");
const sort = document.querySelector("#repo-sort");
const list = document.querySelector("#repo-list");
const statusLine = document.querySelector("#repo-status");
const retry = document.querySelector("#repo-retry");
const storageKey = "portfolio-repository-view";
let repositories = [];

function renderRepositories() {
    const visible = repositories.filter(repo => !language.value || repo.language === language.value);
    visible.sort((a, b) => {
        if (sort.value === "updated" && a.updated_at !== b.updated_at) {
            return b.updated_at.localeCompare(a.updated_at);
        }
        return a.name.localeCompare(b.name);
    });

    const items = visible.map(repo => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = "https://github.com/sq999o/" + encodeURIComponent(repo.name);
        link.textContent = repo.name;
        const detail = document.createElement("p");
        detail.textContent = repo.language + " · Updated " + repo.updated_at.slice(0, 10);
        item.append(link, detail);
        if (repo.description) {
            const description = document.createElement("p");
            description.textContent = repo.description;
            item.append(description);
        }
        return item;
    });
    list.replaceChildren(...items);
    statusLine.textContent = repositories.length
        ? `Showing ${items.length} of ${repositories.length} repositories.`
        : "There are no public repositories to display.";
}

async function loadRepositories() {
    retry.hidden = true;
    statusLine.textContent = "Loading repositories…";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
        const url = "https://api.github.com/users/sq999o/repos?sort=updated&per_page=100";
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("GitHub request failed");
        const data = await response.json();
        repositories = data.map(repo => ({ ...repo, language: repo.language || "Unspecified" }));
        const languages = [...new Set(repositories.map(repo => repo.language))].sort();
        language.replaceChildren(new Option("All languages", ""));
        for (const name of languages) language.add(new Option(name, name));
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey));
            if (languages.includes(saved?.language)) language.value = saved.language;
            if (saved?.sort === "name") sort.value = "name";
        } catch {
            // Controls still work for the current visit if storage is unavailable.
        }
        language.disabled = sort.disabled = !repositories.length;
        renderRepositories();
    } catch {
        statusLine.textContent = "GitHub repositories could not be loaded. Please try again later.";
        retry.hidden = false;
    } finally {
        clearTimeout(timeout);
    }
}

function changeView() {
    renderRepositories();
    try {
        localStorage.setItem(storageKey, JSON.stringify({ language: language.value, sort: sort.value }));
    } catch {
        // The current view remains usable when the browser blocks storage.
    }
}

language.addEventListener("change", changeView);
sort.addEventListener("change", changeView);
retry.addEventListener("click", loadRepositories);
loadRepositories();
