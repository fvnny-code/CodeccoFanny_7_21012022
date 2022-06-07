<template>
    <div id="#app">
    </div>

    <router-view />
</template>

<style lang="scss" >

:root {
    --primary-color: #FD2D01;
    --secondary-color: teal;
    --tertiary-color: #4E5166;
    --text-color: #2c3e50;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    max-width: 100%;
    scroll-behavior: smooth;
    scroll-padding-top: 15rem;
    //color-scheme: light dark;    
}

#app {
    font-family: Lato, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-color);
}

h1 {
    text-align: center;
    color: var(--tertiary-color);
}

h3 {
    color: var(--primary-color);

}

p,
a {
    font-size: 1rem;
}

// General Styling //
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 100%;
    // height: 100vh;
    margin: 7rem auto;
}

.feed {
    padding: 2rem;
    
}

@media screen and (min-width: 800px) {
    .feed {
        padding: 4rem;
    }
}

.scroller {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: thin;
}

// Buttons //
.btn {
    border: none;
    max-width: 100%;
    min-width: 100px;
    margin: 0 0.2rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    background-color: #bbb;
    font-weight: bold;
    font-size: 1rem;

    &:hover {
        transition: 0.6s;
        background-color: var(--secondary-color);
    }
}

.btn-red {
    &:hover {
        transition: 0.6s;
        background-color: var(--primary-color);
    }
}

.btn--outline {
    --outline: 3px solid var(--secondary-color);
    border: 4px solid var(--secondary-color);
    border-radius: 0.5rem;
    background-color: white;
    color: var(--secondary-color);
    font-weight: bold;

    max-width: 100%;
    min-width: 40px;
    margin: 0 0.2rem;
    padding: 1rem;
    cursor: pointer;

    &:hover,
    &:focus {
        transition: 0.6s;
        outline: var(--outline);
        outline-offset: -10px;
        background-color: white;
        color: var(--secondary-color);
    }
}

.btn--outline-red {
    --outline: 3px solid var(--primary-color);
    border: 4px solid var(--primary-color);
    border-radius: 0.5rem;
    background-color: white;
    color: var(--primary-color);

    max-width: 100%;
    min-width: 40px;
    margin: 0 0.2rem;
    padding: 1rem;
    cursor: pointer;

    &:hover,
    &:focus {
        transition: 0.6s;
        outline: var(--outline);
        outline-offset: -10px;
        background-color: white;
        color: var(--primary-color);
    }
}

.btn--close {
    background-color: transparent;
    color: var(--tertiary-color);
    width: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 0.1rem;
    padding: 0;

    &:hover {
        background-color: transparent;
        color: var(--primary-color);

        transition: 0.6s;
    }


}

// Icons //
i {
    font-size: 2rem;
    padding: 0.5rem 2rem;
    color: var(--tertiary-color);

    &:hover {
        transition: 0.6s;
        cursor: pointer;
        color: var(--secondary-color);
    }
}

.i-red {
    &:hover {
        color: var(--primary-color);

    }
}

.fa-check {
    color: var(--secondary-color);
    font-size: 1rem;
    text-align: center;
    padding: 0 0.2rem;

}

.fa-eject {
    color: var(--primary-color);
    font-size: 1rem;
    padding: 0 0.2rem;
}

// Links //
a {
    --outline: 3px solid var(--secondary-color);
    font-weight: bold;
    color: var(--tertiary-color);
    cursor: pointer;

    &:hover {
        transition: 0.6s;
        outline: var(--outline);
        outline-offset: 6px;
        color: var(--secondary-color);
        text-decoration: none;
    }
}

// Forms //
.form-row {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    gap: 0.8rem;
    width: 90%;

}

.form-row__input::placeholder {
    color: #aaaaaa;
}

input,
textarea {
    border: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 0.5rem;
    padding: 1rem;
    max-width: 100%;
    font-size: 1rem;
}

// Cards //
.card {
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    width: 100%;
    padding: 1rem 2rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.card__subtitle {
    font-style: italic;
}

.card__content {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.card-actions {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
}

.space-btwn {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    justify-content: space-between;
    align-items: center;

}

//Images //
img {
    width: 50%;
}

.user__avatar--small {
    max-width: 100px;
    clip-path: polygon(0% 0%, 100% 0, 100% 75%, 75% 75%, 42% 100%, 50% 75%, 0% 75%);
}
</style>
