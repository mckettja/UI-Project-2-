import React from "react";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { RightSidebar } from "./components/RightSidebar";
import { getCourseAssignments } from "./mock-database/mock-database";

/**
 * @satisfies {import('react-router-dom').LoaderFunction}
 */
export const loader = ({ params }) => {
	if (!params.courseId) return null;
	return getCourseAssignments(params.courseId);
};

export const CourseLayout = () => {
	const assignments = /** @type {Awaited<ReturnType<typeof loader>>} */ (useLoaderData());

	if (assignments === null) {
		return "Something wrong with the CourseLayout page";
	}

	return (
		<main className="grid grid-cols-[15%_1fr_auto] gap-12 px-8">
			<nav>
				<ul className="flex flex-col gap-3 px-0 py-6">
					{["Modules", "Assignments", "Syllabus", "Grades", "Zoom", "Announcements"].map((tabName) => (
						<li className="text-black no-underline hover:font-bold hover:underline">
							<NavLink
								end
								to={`${tabName === "Modules" ? "" : tabName.toLowerCase()}`}
								className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
							>
								{tabName}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
			<div className="flex max-w-3xl flex-col gap-6 py-6">
				<Outlet />
			</div>
			<RightSidebar assignmentList={assignments} />
		</main>
	);
};
