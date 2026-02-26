import type { THiringRate } from '../../types/user.types';
import { formatCurrency } from '../../utils/user.utils';

interface HiringRateProps {
  hiringRate: THiringRate;
}

const HiringRate: React.FC<HiringRateProps> = ({ hiringRate }) => {
  return (
    <div className="border-t border-gray-200 pt-4">
      <h3 className="text-sm font-medium text-gray-900 mb-3">Hiring Rates</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-xs text-gray-500">Hourly</p>
          <p className="text-sm font-medium text-gray-900">
            {formatCurrency(hiringRate.hourlyPricing)}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-xs text-gray-500">Daily</p>
          <p className="text-sm font-medium text-gray-900">
            {formatCurrency(hiringRate.dailyPricing)}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-xs text-gray-500">Weekly</p>
          <p className="text-sm font-medium text-gray-900">
            {formatCurrency(hiringRate.weeklyPricing)}
          </p>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-200">
          <p className="text-xs text-gray-500">Monthly</p>
          <p className="text-sm font-medium text-gray-900">
            {formatCurrency(hiringRate.monthlyPricing)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HiringRate;