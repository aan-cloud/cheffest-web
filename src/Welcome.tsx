export default function WelcomePage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                    Welcome to Cheffest API
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                    The OpenAPI Specification for the Cheffest API offers a
                    detailed description of the API's services. It can be
                    accessed at the path{" "}
                    <code className="bg-gray-200 rounded px-2 py-1">
                        /api-spec
                    </code>
                    .
                </p>
                <p className="text-lg text-gray-700 mb-6">
                    For a more interactive experience, you can use SwaggerUI. It
                    provides a user-friendly interface for exploring and testing
                    the API. You can access SwaggerUI at{" "}
                    <code className="bg-gray-200 rounded px-2 py-1">/ui</code>.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    You can also access the following:
                </p>
                <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
                    <li>
                        <a
                            href="/openapi.json"
                            target="_blank"
                            className="text-blue-500 hover:underline"
                        >
                            OpenAPI Specification
                        </a>
                    </li>
                    <li>
                        <a
                            href="/ui"
                            target="_blank"
                            className="text-blue-500 hover:underline"
                        >
                            SwaggerUI
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}