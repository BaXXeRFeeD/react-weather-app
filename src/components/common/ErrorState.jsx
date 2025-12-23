const ErrorState = ({ message }) => (
    <div className="flex justify-center items-center h-screen text-red-500">
        {message || 'An error occurred'}
    </div>
);

export default ErrorState;