
interface BioProps {
  bio: string;
}

const Bio: React.FC<BioProps> = ({ bio }) => {
  return (
    <div className="mt-4 space-y-1">
      <p className="text-sm text-gray-600">Bio</p>
      <div className="p-3 bg-gray-50 rounded border border-gray-200">
        <p className="text-sm text-gray-600">{bio || "No bio provided"}</p>
      </div>
    </div>
  );
};

export default Bio;