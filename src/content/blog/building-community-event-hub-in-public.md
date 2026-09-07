---
title: Building Community Event Hub in Public
subtitle: An open-source Power Platform project where I build, learn, make decisions, and share the process live
date: 2026-09-03
tags:
  - power-platform
  - dataverse
  - open-source
  - community-event-hub
  - architecture
  - dynamics-365CE
category: tech
description: Why I started Community Event Hub, what I have built during the first three live sessions, and why I decided to build the whole Power Platform project publicly.
---

A few weeks ago, I decided to start something a little different.

Instead of creating another small demo application, finishing it privately, and only showing the final result, I wanted to build a complete project from the beginning and share the whole process.

That project became **Community Event Hub**.

Community Event Hub is an open-source Power Platform project where I am exploring how to build a maintainable and scalable event-management solution using Microsoft Dataverse and the Power Platform.

But the application itself is only one part of the idea.

The more important part for me is the journey of building it.

## Why I started this project

When we look at demos, conference sessions, tutorials, or documentation, we usually see one specific feature.

Create a plugin.

Build a Power Automate flow.

Create a PCF control.

Add JavaScript to a form.

Those things are useful, but real projects are more complicated.

Before writing the first plugin, there are many questions to answer.

Should this table even be custom?

Can we use something already available in Dataverse?

Where should this business logic live?

Should it be JavaScript, a plugin, Power Automate, a Business Rule, or something else?

How should the solution be structured?

How do we keep the project maintainable when it grows?

These are the questions I want to explore with Community Event Hub.

The goal is not to demonstrate the biggest number of Power Platform features possible.

The goal is to make engineering decisions that make sense and explain why I am making them.

## Why build it live?

This was probably the part that pushed me the most outside of my comfort zone.

Every episode is streamed live.

There is no perfectly prepared final application sitting somewhere in the background.

I am building the project step by step, explaining what I am doing, discussing the decisions, and sometimes changing the approach when I find something better.

That is much closer to how real software development works.

You don't always know the final architecture on day one.

You start with requirements, make decisions based on the information you currently have, build something, learn from it, and improve it.

I also wanted the project to be useful for people who are learning Power Platform development.

Instead of only showing *how* to configure something, I want to talk about *why* I would choose one approach instead of another.

And sharing the process also helps me learn.

Explaining a decision while building something forces me to think much more carefully about that decision.

## Everything is open source

The complete Community Event Hub project is available publicly on GitHub.

The repository is not only a place for the exported Power Platform solution.

I also want it to document the engineering decisions behind the project.

The repository currently contains documentation around:

- project architecture;
- engineering principles;
- the Dataverse data model;
- business-logic architecture;
- the project roadmap;
- the unpacked Power Platform solution.

My goal is that someone should eventually be able to open the repository and understand not only **what was built**, but also **why it was built that way**.

## Episode 1 — Starting with the foundation

The first live session was on **August 13, 2026**.

The topic was:

### How to Start a Maintainable Power Platform Project

I intentionally did not start by opening Power Apps and creating tables.

Before touching the implementation, I wanted to define what we were actually building.

During the first episode, I worked on:

- the project vision;
- project scope;
- non-goals;
- initial architecture;
- engineering principles;
- the project roadmap;
- the initial GitHub repository.

One important decision was defining what the project should **not** become.

Community Event Hub is not intended to replace platforms such as Sessionize or run.events.

It is also not intended to become a huge multi-tenant SaaS platform or a ticketing and payment system.

Keeping those boundaries makes it easier to focus on the engineering topics I actually want to explore.

## Episode 2 — Designing the Dataverse foundation

The second session was on **August 20, 2026**.

This time we finally started building the actual Dataverse foundation.

But again, I didn't want the first reaction to every requirement to be:

> Let's create another custom table.

Dataverse already provides many useful concepts, and understanding what is available before creating custom functionality can make a solution much simpler.

During this episode, I explored using standard Dataverse tables such as **Account** and **Contact** for organizations, speakers, sponsors, and other people involved with events.

We also looked at standard Dataverse Activities such as:

- Appointments;
- Emails;
- Tasks;
- Phone Calls.

Another interesting part was using **Connections and Connection Roles** for relationships that need to remain flexible instead of creating custom junction tables for everything.

At the same time, there are parts of the domain where custom tables make sense.

The first custom tables for **Event** and **Session** were introduced, and the first version of the Community Event Hub data model started taking shape.

We also created the Power Platform solution and publisher, organized the repository structure, and stored the unpacked solution source in GitHub.

## Episode 3 — Where should business logic live?

The third live session was on **August 27, 2026**.

The topic was one of my favorite Power Platform architecture discussions:

### Plugin, JavaScript or Power Automate?

There are many places where we can implement business logic in a Power Platform solution.

For example:

- Dataverse configuration;
- Business Rules;
- JavaScript or TypeScript;
- C# plugins;
- Custom APIs;
- Power Automate.

The interesting question is not whether one of these technologies is better than the others.

The important question is:

**Which one is the right tool for this specific responsibility?**

That is what Episode 3 started exploring.

Client-side validation has different requirements from server-side business rules.

An integration process has different requirements from synchronous validation.

Logic that protects data integrity should not exist only inside the user interface.

And sometimes the simplest Dataverse configuration is better than writing custom code at all.

The goal is to establish a clear business-logic strategy before the application becomes larger.

## What comes next

Community Event Hub is still at an early stage.

The foundation is becoming clearer, but there is still a lot to build.

The project will gradually explore scenarios around:

- events and venues;
- speakers and community contacts;
- session submissions;
- reviews and approvals;
- rooms and scheduling;
- notifications;
- attendee feedback;
- integrations with other event platforms;
- automation;
- custom development.

I also expect some of the architecture to change.

And that is completely fine.

Part of the reason for building the project publicly is to show that maintainable software does not come from making every decision perfectly at the beginning.

It comes from thinking carefully, keeping the architecture understandable, learning as the project grows, and being willing to improve earlier decisions.

## Follow the journey

Community Event Hub is an open-source project, and the source code, documentation, architecture decisions, and roadmap are available in the public GitHub repository.

The development also continues through the Community Event Hub live series on YouTube, where I build each part of the project step by step.

If you are working with Dynamics 365 CE, Dataverse, or the Power Platform, I hope you can find something useful in the project.

And if you have a different approach to something I build, I would be happy to hear it.

That is also part of the reason I wanted to build this in public.

**Build something, share it, discuss it, learn from it, and make the next version better.**
