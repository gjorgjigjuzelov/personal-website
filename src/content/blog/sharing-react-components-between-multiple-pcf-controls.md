---
title: Sharing React Components Between Multiple PCF Controls
subtitle: How a shared React project can help us reuse components, hooks, services, and logic across multiple PCF controls
date: 2026-09-07
tags:
  - power-platform
  - pcf
  - react
  - typescript
  - fluent-ui
  - dynamics-365CE
category: tech
description: How I use a shared React project to reuse components, hooks, services, and PCF context between multiple Power Apps Component Framework controls.
---

# Sharing React Components Between Multiple PCF Controls

First, a big thank you to [DynamicsMinds](https://www.dynamicsminds.com/) for accepting my session **React Superpowers for PCF: Next-Level Custom Components**.

Preparing this session gave me the chance to experiment more with React inside PCF and to think about one important question:

**What happens when we have more than one PCF control and they need the same components and logic?**

This is the main topic I want to cover in this post.

You can find the complete demo project in my [GitHub repository](https://github.com/gjorgjigjuzelov/reusable-pcf-controls-react).

## The problem

Many PCF examples show how to create one control.

This is a great way to learn PCF.

But real projects can have many PCF controls.

When we start creating more controls, we can easily repeat the same code.

For example, two PCF controls may need the same:

- React components
- Fluent UI components
- Dataverse calls
- custom hooks
- types
- helper functions
- validation
- selection logic

We can copy this code from one PCF to another.

But after some time, this becomes difficult to maintain.

If we find a bug, we may need to fix it in multiple places.

If we want to change the UI, we may need to make the same change in multiple controls.

There is another way.

## Create a shared project

In my demo repository, I created a separate project called:

```text
pcf-shared
```

The idea is very simple.

Instead of putting all React code inside every PCF, we can move reusable code into one shared project.

The repository looks like this:

```text
reusable-pcf-controls-react/
│
├── pcf-shared/
│
├── SingleSelectLookup/
│
├── MultiSelectLookup/
│
└── solutions/
```

`SingleSelectLookup` and `MultiSelectLookup` are two different PCF controls.

But both of them use code from `pcf-shared`.

The idea looks like this:

```text
SingleSelectLookup ──┐
                     ├── pcf-shared
MultiSelectLookup ───┘
```

This means that the PCF controls can stay smaller and focus mainly on their specific PCF configuration.

The reusable React code can stay in one place.

## Referencing the shared project

Both PCF projects reference `pcf-shared` as a local dependency.

Inside `package.json`, we have:

```json
"pcf-shared": "file:../pcf-shared"
```

This allows the PCF project to import components, hooks, services, and other code from the shared project.

Before building the PCF controls, we first build `pcf-shared`.

```bash
cd pcf-shared
npm install
npm run build
```

After that, we can build the PCF projects.

The shared project creates the reusable code that the PCF controls can consume.

## What can we share?

In this demo, `pcf-shared` contains several different types of reusable code.

```text
pcf-shared/
└── src/
    ├── components/
    ├── context/
    ├── hooks/
    ├── services/
    ├── types/
    └── utils/
```

Let's look at some examples.

## Shared React component

The main shared React component in the project is:

```text
LookupTagPicker
```

It is created with Fluent UI v9.

Both PCF controls use the same component.

The component is responsible for the picker UI. The individual PCF controls do not need to recreate this UI.

For example:

```tsx
<LookupTagPicker
  label="Accounts"
  placeholder="Search accounts..."
  searchText={picker.searchText}
  items={picker.items}
  selectedItems={picker.selectedItems}
  isLoading={picker.isLoading}
  onSearchTextChange={picker.setSearchText}
  onSelectItem={picker.selectItem}
  onRemoveItem={picker.removeItem}
/>
```

If later I want to change how the picker looks, I can change the shared component.

I do not need to create the same change separately in every PCF.

## Shared React hook

The project also contains a shared hook called:

```text
useLookupPicker
```

The hook contains logic for:

- searching
- loading records
- selecting records
- removing records
- storing selected items
- calling the Dataverse service

It can also work with different selection modes.

For example:

```ts
selectionMode: "single"
```

or:

```ts
selectionMode: "multiple"
```

This is one of my favorite parts of this example.

The single-select and multi-select PCF controls are different controls, but a big part of their React logic is the same.

We do not need two completely different implementations.

## Sharing the PCF context

There is another problem when we move React code outside of the PCF control.

React does not automatically know about the PCF `context`.

But our shared hooks and services may need access to things like:

```ts
context.webAPI
```

For this reason, the project contains:

```text
PcfContextProvider
```

The PCF passes its context to the provider:

```tsx
<PcfContextProvider context={context}>
  <MultiSelectLookupContent />
</PcfContextProvider>
```

After that, components inside the provider can access the PCF context through a shared hook:

```ts
const context = usePcfContext();
```

This helps us avoid passing the PCF context through many different component properties.

## Sharing Dataverse services

I also wanted to keep Dataverse calls outside of the UI components.

For this reason, the shared project contains:

```text
DataverseLookupService
```

The service can use:

```ts
context.webAPI.retrieveMultipleRecords(...)
```

The React component does not need to know how the Dataverse request works.

Its job is to show the UI.

The service's job is to communicate with Dataverse.

For me, this makes the code easier to understand and maintain.

## Testing becomes easier

Another benefit of moving logic into a shared project is testing.

PCF controls have their own lifecycle, which can sometimes make testing more complicated.

But when React components, services, utilities, and hooks are separated from the PCF wrapper, we can test many of them independently.

In this project I use:

- Vitest
- React Testing Library

For example, we can test:

- parser utilities
- React components
- the PCF context provider
- Dataverse services with mocked `context.webAPI`

This is another reason why I like keeping the PCF control itself small.

## Two PCFs, one shared architecture

The example repository contains two controls:

```text
SingleSelectLookup
MultiSelectLookup
```

They have different behavior.

One allows one selected record.

The other allows multiple selected records.

But both can share:

```text
LookupTagPicker
useLookupPicker
PcfContextProvider
DataverseLookupService
LookupItem
parser utilities
```

Instead of this:

```text
SingleSelectLookup
├── picker UI
├── search logic
├── Dataverse logic
└── selection logic

MultiSelectLookup
├── picker UI
├── search logic
├── Dataverse logic
└── selection logic
```

We can have:

```text
SingleSelectLookup ──┐
                     │
                     ├── pcf-shared
                     │
MultiSelectLookup ───┘
```

For me, this is the most important idea from this project.

## Keep the PCF small

I like to think about the PCF control as the connection between Power Platform and our React application.

The PCF should handle the things that are specific to that control.

But this does not mean every React component, hook, service, or helper needs to live inside that PCF project.

If something can be reused, we can move it into the shared project.

This can help make our controls:

- smaller
- cleaner
- easier to maintain
- easier to test
- easier to reuse
- more consistent

Of course, not everything needs to be shared.

If some logic is specific only to one control, it can stay inside that PCF.

The goal is not to move everything into `pcf-shared`.

The goal is to avoid repeating the same code when we do not need to.

## Final thoughts

React inside PCF is powerful because we can build much more than a nice UI.

We can also use React patterns to create better structure around our PCF projects.

When we have multiple controls, a shared project can give us one place for common components, hooks, services, types, and utilities.

This was one of the main ideas behind my **React Superpowers for PCF: Next-Level Custom Components** session at DynamicsMinds.

If you want to see the complete example, source code, tests, and solution structure, you can find everything in the [reusable-pcf-controls-react GitHub repository](https://github.com/gjorgjigjuzelov/reusable-pcf-controls-react).

And again, a big thank you to [DynamicsMinds](https://www.dynamicsminds.com/) for giving me the opportunity to present this topic and share my ideas with the community.