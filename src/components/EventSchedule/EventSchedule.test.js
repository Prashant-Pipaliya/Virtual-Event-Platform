import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventSchedule from "../EventSchedule";

describe("EventSchedule Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("should render initial sessions and allow joining a session", () => {
    render(<EventSchedule />);

    expect(screen.getByText("Session 1")).toBeInTheDocument();
    expect(screen.getByText("Session 2")).toBeInTheDocument();

    // Join first session
    const joinButtons = screen.getAllByText("Join Session");
    fireEvent.click(joinButtons[0]);

    // Check if the joined session is displayed
    expect(screen.getByText("Joined Session: Session 1")).toBeInTheDocument();
  });

  test("should display live content input and send button after joining a session", () => {
    render(<EventSchedule />);

    // Assuming the second session does not have a video
    const joinButtons = screen.getAllByText("Join Session", {
      selector: "button",
    });

    // Click the second "Join Session" button (assuming second session has no video)
    fireEvent.click(joinButtons[1]);

    // Check live content textarea and send button are displayed
    expect(
      screen.getByPlaceholderText("Enter live content here...")
    ).toBeInTheDocument();
    expect(screen.getByText("Send")).toBeInTheDocument();
  });

  test("should add live content to the session and display it in real-time", () => {
    render(<EventSchedule />);

    const joinButtons = screen.getAllByText("Join Session", {
      selector: "button",
    });

    fireEvent.click(joinButtons[1]);

    // Add live content
    const textarea = screen.getByPlaceholderText("Enter live content here...");
    fireEvent.change(textarea, { target: { value: "Test live content 1" } });
    fireEvent.click(screen.getByText("Send"));

    // Check if live content is displayed
    expect(screen.getByText("Test live content 1")).toBeInTheDocument();

    // Add another live content
    fireEvent.change(textarea, { target: { value: "Test live content 2" } });
    fireEvent.click(screen.getByText("Send"));

    // Check if both messages are displayed
    expect(screen.getByText("Test live content 1")).toBeInTheDocument();
    expect(screen.getByText("Test live content 2")).toBeInTheDocument();
  });

  test("should add a new session with valid data and persist it", () => {
    render(<EventSchedule />);

    fireEvent.change(screen.getByPlaceholderText("Session Title"), {
      target: { value: "New Session" },
    });
    fireEvent.click(screen.getByText("Add Session"));

    expect(screen.getByText("New Session")).toBeInTheDocument();

    // Re-render the component to simulate a reload
    render(<EventSchedule />);

    // Check if the session persists after re-render
    expect(screen.getAllByText("New Session").length).toBe(2);
  });

  test("should show error for invalid video URL when adding a session", () => {
    render(<EventSchedule />);

    // Add new session with invalid URL
    fireEvent.change(screen.getByPlaceholderText("Session Title"), {
      target: { value: "Invalid URL Session" },
    });
    fireEvent.change(screen.getByPlaceholderText("Video URL"), {
      target: { value: "invalid-url" },
    });
    fireEvent.click(screen.getByText("Add Session"));

    // Check if URL error message is displayed
    expect(screen.getByText("Invalid video URL")).toBeInTheDocument();
  });

  test("should persist live content in localStorage", () => {
    render(<EventSchedule />);

    fireEvent.click(screen.getAllByText("Join Session")[1]);

    fireEvent.change(
      screen.getByPlaceholderText("Enter live content here..."),
      { target: { value: "Persistent live content" } }
    );
    fireEvent.click(screen.getByText("Send"));

    // Reload component and check if live content persists
    render(<EventSchedule />);
    fireEvent.click(screen.getAllByText("Join Session")[1]);
    expect(screen.getByText("Persistent live content")).toBeInTheDocument();
  });
});
